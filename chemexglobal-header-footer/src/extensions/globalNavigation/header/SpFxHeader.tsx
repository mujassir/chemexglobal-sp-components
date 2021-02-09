import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpFxHeaderProps } from './ISpFxHeaderProps';
import styles from './SpFxHeader.module.scss';
import Constants from '../../../common/constants';
import ListDataManager from '../../../common/list.data.manager';
import IHeaderLink from '../../../common/IHeaderLink';
import HeaderMenu from './HeaderMenu';
import * as $ from 'jquery';


export default class SpFxHeader extends React.Component<ISpFxHeaderProps, {}> {
  public state = {
    links: null
  };


  public render(): React.ReactElement<ISpFxHeaderProps> {
    return (
      <div className={styles.spFxHeader}>
        <header id="home">
            <div className={styles.logo}>
              <a href={this.getRootURL()}>
              {this.renderLogo()}
              </a>
            </div>
          <div className={styles.clear}></div>
        </header>
      </div >
    );
  }

  public renderLogo(): React.ReactElement<any> {
    return (
      <img src={require('../images/Chemex_Logo.png')} />
      // <img src={`https://eastus1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fchemex.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!yxISVGYDS0SL3zpEvWJtSnSoGXc0R1hFkQ6BIvTDldP-mEF_ACsmQZXWladVdBw3%2Fitems%2F01XAEBT3BEI5SAZL47PZEIMRQAJINIFHH7%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2hlbWV4LnNoYXJlcG9pbnQuY29tQDYzM2EzNWE2LTQyZGItNGIxOS1iMGJjLTZmYTRhOTAxMGFjMSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2MDYzMTY0MDAiLCJleHAiOiIxNjA2MzM4MDAwIiwiZW5kcG9pbnR1cmwiOiJkMitDSkJkKytFeWtibVR3citrazIrY0tnNllONVkwMmFxbEY2UkYwNUhvPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTEzIiwiaXNsb29wYmFjayI6IlRydWUiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiTlRReE1qRXlZMkl0TURNMk5pMDBORFJpTFRoaVpHWXRNMkUwTkdKa05qSTJaRFJoIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsIm5hbWVpZCI6IjAjLmZ8bWVtYmVyc2hpcHx2cGF0ZWxAY2hlbWV4Z2xvYmFsLmNvbSIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAwZWE5MmMyMGVAbGl2ZS5jb20iLCJ0dCI6IjAiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjoiMyJ9.SkZ3T3Y1STcyOVNWTFdJQ3h6bi9zL2xPNFpPOGdleFhydEhqd1NRRWVqTT0&encodeFailures=1&srcWidth=&srcHeight=&width=1919&height=920&action=Access`} />
    );

  }

  public componentDidMount2() {
    this.getLinksData();
    $(document).ready(() => {
      $('.nav').prepend('<div id="menu-button"></div>');
      $('.nav #menu-button').on('click', function () {
        var menu = $(this).next('ul');
        if (menu.hasClass('open')) {
          menu.removeClass('open');
        }
        else {
          menu.addClass('open');
        }
      });
    });

  }
  private async getLinksData() {
    let listName = this.props.listName || Constants.Defaults.Header.ListName;
    let links = await ListDataManager.getHeaderLinks(listName);
    this.setState({ links: links });
  }

  private getRootURL(){
    return window.location.origin;
  }

}
