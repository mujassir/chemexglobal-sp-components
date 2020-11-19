import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';

export default class EmployeeSpotlightItem extends React.Component<any, {}> {


  public render(): React.ReactElement<any> {
    return (
        <li>
          <img src={this.props.item.EmployeePicture} />
          <span>{this.getFirstName(this.props.item.EmployeeName)}
            <b>{this.getLastName(this.props.item.EmployeeName)}</b>
          </span>
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
