import * as React from 'react';
import styles from './UpComingEvents.module.scss';
import { IUpComingEventsProps } from './IUpComingEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';

export default class UpComingEventItem extends React.Component<any, {}> {


  public render(): React.ReactElement<any> {
    return (
      <li>
        <span>{this.getDate(this.props.item.Date)}
          <b>{this.getMonthName(this.props.item.Date)}</b>
        </span>
        <strong>{this.props.item.EventName} </strong>
        <em>{this.trimText(this.props.item.EventDescription, Constants.Defaults.UpcomingEvents.Description_MaxLength)}</em>
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
