import * as React from "react";
import styles from "./RecentNews.module.scss";
import { IRecentNewsProps } from "./IRecentNewsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import ListDataManager from "../../../managers/list.data.manager";
import Constants from "../../../common/constants";

export default class RecentNewsItem extends React.Component<any, {}> {
  public render(): React.ReactElement<any> {
    return (
      <li>
        <a href={this.props.item.ArticleLink}>
          <strong>{this.props.item.NewsTitle} </strong>
          <em>
            {this.props.item.NewsDescription}
          </em>
          <div className={styles.clear}></div>
          <em>
            <span>{this.getDate(this.props.item.DatePublished)}</span>
          </em>
        </a>
      </li>
    );
  }

  private trimText(input: string, length: number): string {
    if (input.length > length) input = input.substr(0, length) + " ...";
    return input;
  }
  private getMonthName(date: Date): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[date.getMonth()].substr(0, 3);
  }

  private getDate(date: Date) {
    let getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    return getDate;
  }
}
