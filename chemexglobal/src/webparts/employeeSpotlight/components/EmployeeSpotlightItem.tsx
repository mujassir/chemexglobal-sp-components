import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';

export default class EmployeeSpotlightItem extends React.Component<any, {}> {


  public render(): React.ReactElement<any> {
    return (
      <li>
        <h4>{this.props.item.EventPersonName}</h4>
        <img src={this.props.item.EventPersonImage} />
        <p>{this.props.item.Description}</p>
      </li>
    );
  }


  private getFirstName(fullName: string): string {
    let tokens = fullName.split(' ');
    if (tokens.length > 0) return tokens[0];
  }

  private getLastName(fullName: string): string {
    let tokens = fullName.split(' ');
    if (tokens.length > 1) return tokens[1];
  }




}
