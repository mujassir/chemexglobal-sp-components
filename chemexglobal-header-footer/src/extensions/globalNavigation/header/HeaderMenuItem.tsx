import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpFxHeaderProps } from './ISpFxHeaderProps';
import styles from './SpFxHeader.module.scss';
import Constants from '../../../common/constants';
import ListDataManager from '../../../common/list.data.manager';
import IHeaderLink from '../../../common/IHeaderLink';
import IMenuItem from '../../../common/IMenuItem';
import HeaderMenu from './HeaderMenu';

export default class HeaderMenuItem extends React.Component<any, {}> {
  public render(): React.ReactElement<any> {
    return (
      <li >
        <a href={this.props.item.LinkUrl}>{this.props.item.LinkTitle}</a>

        {this.props.item.ChildItems && this.props.item.ChildItems.length > 0
          ?
          <HeaderMenu links={this.props.item.ChildItems}></HeaderMenu>
          : (null)
        }
      </li>
    );
  }


}
