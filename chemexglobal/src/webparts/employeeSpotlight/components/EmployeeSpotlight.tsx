import * as React from 'react';
import styles from './EmployeeSpotlight.module.scss';
import { IEmployeeSpotlightProps } from './IEmployeeSpotlightProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Constants from '../../../common/constants';
import Loader from 'react-loader-spinner';     //https://www.npmjs.com/package/react-loader-spinner
import IEmployeeSpotlight from '../../../models/IEmployeeSpotlight';
import EmployeeSpotlightItem from './EmployeeSpotlightItem';
import ListDataManager from '../../../managers/list.data.manager';

export default class EmployeeSpotlight extends React.Component<IEmployeeSpotlightProps, {}> {

  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };
  public render(): React.ReactElement<IEmployeeSpotlightProps> {
    return (
      <div className={styles.employeeSpotlight}>

        <h3>{this.props.title || Constants.Defaults.EmployeeSpotlight.Title}</h3>

        {this.state.isLoading
          ?
          this.renderLoader()
          :
          this.renderListData()
        }

        <div className={styles.clear}></div>
      </div>
    );
  }

  private renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader
          type={Constants.Defaults.Loader.type}
          color={Constants.Defaults.Loader.color}
          height={Constants.Defaults.Loader.height}
          width={Constants.Defaults.Loader.width}
        />
      </div>
    );
  }

  private renderListData() {
    return (
      <div className={styles.container}>
        <ul>
          {this.state.hasErrors
            ?
            this.renderError()
            :
            this.state.items && this.state.items.map((item: IEmployeeSpotlight, key: any) => {
              return <EmployeeSpotlightItem item={item} key={key}></EmployeeSpotlightItem>;
            })
          }
        </ul>
      </div>

    );
  }

  private renderError() {
    return (
      <div className={styles.error}>{this.state.errors}</div>
    );
  }

  public componentDidMount() {
    this.loadListData();
  }
  private async loadListData() {
    try {
      this.setState({ isLoading: true, hasErrors: false });
      let listName = this.props.listName || Constants.Defaults.EmployeeSpotlight.ListName;
      let list = await ListDataManager.getEmployeeSpotlightData(listName);

      this.setState({
        isLoading: false,
        items: list
      });
    } catch (error) {
      console.log('Get List data error: ', error);
      this.setState({
        isLoading: false,
        hasErrors: true,
        errors: Constants.Errors.ListError
      });
    }
  }
}
