import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RecentNewsWebPartStrings';
import RecentNews from './components/RecentNews';
import { IRecentNewsProps } from './components/IRecentNewsProps';
import { sp } from '@pnp/sp';

export interface IRecentNewsWebPartProps {
  title: string;
  listName: string;
}

export default class RecentNewsWebPart extends BaseClientSideWebPart<IRecentNewsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IRecentNewsProps> = React.createElement(
      RecentNews,
      {
        title: this.properties.title,
        listName: this.properties.listName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneTextField("listName", {
                  label: strings.ListNameFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
