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
          <strong>
            {this.trimIconName(this.props.item.IconName, 11)}
          </strong>
        </a>
        {/* <strong>Text Here</strong> */}
      </li>
    );
  }

  private trimIconName(input: string, length: number): string {
    if (input.length > length)
      input = input.substr(0, length);
    return input;
  }


}
