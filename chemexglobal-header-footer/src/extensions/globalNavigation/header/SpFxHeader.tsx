import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpFxHeaderProps } from './ISpFxHeaderProps';
import styles from './SpFxHeader.module.scss';
import Constants from '../../../common/constants';
import ListDataManager from '../../../common/list.data.manager';
import IHeaderLink from '../../../common/IHeaderLink';
import HeaderMenu from './HeaderMenu';


export default class SpFxHeader extends React.Component<ISpFxHeaderProps, {}> {
  public state = {
    links: null
  };

  public render(): React.ReactElement<ISpFxHeaderProps> {
    return (
      <div className={styles.spFxHeader}>
        <div className={styles.image} style={{ backgroundImage: 'url(http://paavanprakriti.com/chemexglobal/images/banner.jpg)' }}>
        </div>
        <header id="home">
          <div className={styles.container}>

            <div className="nav">
              <div id="menu-button"></div>
              <HeaderMenu links={this.state.links}></HeaderMenu>
            </div>
            <div className={styles.logo}> <img src="http://paavanprakriti.com/chemexglobal/images/logo.png" /> </div>
            <div className={styles.clear}></div>
          </div>
          <div className={styles.clear}></div>
        </header>
      </div >
    );
  }

  public componentDidMount() {
    this.getLinksData();
  }
  private async getLinksData() {
    let listName = this.props.listName || Constants.Defaults.Header.ListName;
    let links = await ListDataManager.getHeaderLinks(listName);
    this.setState({ links: links });
  }

}
