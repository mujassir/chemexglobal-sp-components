import * as React from 'react';
import styles from './SpFxFooter.module.scss';
import { ISpFxFooterProps } from './ISpFxFooterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../common/list.data.manager';
import Constants from '../../../common/constants';
import IFooterLink from '../../../common/IFooterLink';

export default class SpFxFooter extends React.Component<ISpFxFooterProps, {}> {

  public state = {
    links: null
  };
  public render(): React.ReactElement<ISpFxFooterProps> {
    return (
      <div>
        {/* { this.renderUI()} */}
      </div>
    );
  }
  public renderUI() {
    return (
      <div className={styles.spFxFooter}>

        <footer>
          <div className={styles.container}>
            <img src="http://paavanprakriti.com/chemexglobal/images/favicon.png" />
            <ul>
              {this.state.links && this.state.links.map((item: IFooterLink, key: any) => {
                return (<li key={key}> <a href={item.URLLinkName}>{item.Title}</a></li>);
              })}
            </ul>
          </div>
          <div className={styles.clear}></div>
        </footer>
      </div >
    );
  }

  public componentDidMount() {
    //this.getLinksData();
  }
  private async getLinksData() {
    let listName = this.props.listName || Constants.Defaults.Footer.ListName;
    let links = await ListDataManager.getFooterLinks(listName);
    this.setState({ links: links });
  }
}
