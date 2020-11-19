import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';

export default class IconWidgetItem extends React.Component<any, {}> {


  public render(): React.ReactElement<any> {
    return (
      <li>
        <a href={this.props.item.ApplicationLink} target="_blank" data-interception="off">
          <img src={this.props.item.IconImage} />
        </a>
        {/* <strong>Text Here</strong> */}
      </li>
    );
  }

  private trimText(input: string, length: number): string {
    if (input.length > length)
      input = input.substr(0, length) + " ...";
    return input;
  }
  private getMonthName(date: Date): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()].substr(0, 3);
  }

  private getDate(date: Date) {
    return date.getDate();
  }




}
