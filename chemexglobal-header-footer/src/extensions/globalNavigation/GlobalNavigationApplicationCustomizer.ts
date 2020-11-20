import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GlobalNavigationApplicationCustomizerStrings';
import styles from './GlobalNavigationApplicationCustomizer.module.scss';
import { ISpFxFooterProps } from './footer/ISpFxFooterProps';
import SpFxFooter from './footer/SpFxFooter';
import { ISpFxHeaderProps } from './header/ISpFxHeaderProps';
import SpFxHeader from './header/SpFxHeader';
import { sp } from '@pnp/sp';

const LOG_SOURCE: string = 'GlobalNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGlobalNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  FooterListName: string;
  HeaderListName: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalNavigationApplicationCustomizerProperties> {

  private _topPlaceholderHeader: PlaceholderContent | undefined;

  private _bottomPlaceholderFooter: PlaceholderContent | undefined;


  @override
  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });


    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);
    //Added the below line code to handle the possible changes on the existence of placeholders.  
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);
    //The below code is used to call render method for generating the HTML elements.  
    this._renderPlaceHoldersHeaderandFooter();

    return Promise.resolve();
  }

  private _renderPlaceHoldersHeaderandFooter(): void {

    console.log('HeaderAndFooterAppExtensionApplicationCustomizer._renderPlaceHoldersHeaderandFooter()');

    console.log('Available placeholders are as below: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    //Handling the top placeholder - header section
    if (!this._topPlaceholderHeader) {
      this._topPlaceholderHeader =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          {
            onDispose: this._onDispose
          });

      //The extension should not assume that the expected placeholder is available.  
      if (!this._topPlaceholderHeader) {
        console.error('The expected placeholder (top heder) was not found.');
        return;
      }

      if (this.properties) {
        if (this._topPlaceholderHeader.domElement) {
          const element: React.ReactElement<ISpFxHeaderProps> = React.createElement(
            SpFxHeader,
            {
              listName: this.properties.HeaderListName
            }
          );
          ReactDom.render(element, this._topPlaceholderHeader.domElement);
        }
      }
    }



    //Handling the bottom placeholder - Footer section

    if (!this._bottomPlaceholderFooter) {
      this._bottomPlaceholderFooter =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });
      // The extension should not assume that the expected placeholder is available.  
      if (!this._bottomPlaceholderFooter) {
        console.error('The expected placeholder (Bottom Footer) was not found.');
        return;
      }

      if (this.properties) {
        if (this._bottomPlaceholderFooter.domElement) {
          const element: React.ReactElement<ISpFxFooterProps> = React.createElement(
            SpFxFooter,
            {
              listName: this.properties.FooterListName
            }
          );
          ReactDom.render(element, this._bottomPlaceholderFooter.domElement);
        }
      }
    }

  }

  private _onDispose(): void {
    console.log('[HeaderAndFooterAppExtensionApplicationCustomizer._onDispose] Disposed from the top header and bottom footer placeholders.');

  }
}
