import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpFxHeaderProps } from './ISpFxHeaderProps';
import styles from './SpFxHeader.module.scss';
import Constants from '../../../common/constants';
import ListDataManager from '../../../common/list.data.manager';
import IHeaderLink from '../../../common/IHeaderLink';
import IMenuItem from '../../../common/IMenuItem';
import HeaderMenuItem from './HeaderMenuItem';

export default class HeaderMenu extends React.Component<any, {}> {
  public render(): React.ReactElement<any> {
    return (
      <ul>
        {this.props.links && this.props.links.map((item: IMenuItem, key: any) => {
          return (<HeaderMenuItem item={item}></HeaderMenuItem>);
        })}
      </ul>
    );
  }


}
