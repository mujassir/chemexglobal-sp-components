import * as React from 'react';
import styles from './SpFxFooter.module.scss';
import { ISpFxFooterProps } from './ISpFxFooterProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpFxFooter extends React.Component<ISpFxFooterProps, {}> {
  public render(): React.ReactElement<ISpFxFooterProps> {
    return (
      <div className={styles.spFxFooter}>

        <footer>
          <div className={styles.container}>
            <img src="http://paavanprakriti.com/chemexglobal/images/favicon.png" />
            <ul>
              <li><a href="#">IT Request</a></li>
              <li><a href="#"> Company Website</a></li>
              <li><a href="#">About US</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact US </a></li>
            </ul>
          </div>
          <div className={styles.clear}></div>
        </footer>
      </div >
    );
  }
}
