import * as React from 'react';
import styles from './UpComingEvents.module.scss';
import { IUpComingEventsProps } from './IUpComingEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';
import IUpComingEvent from '../../../models/IUpComingEvent';
import UpComingEventItem from './UpComingEventItem';
import Loader from 'react-loader-spinner';     //https://www.npmjs.com/package/react-loader-spinner

export default class UpComingEvents extends React.Component<IUpComingEventsProps, {}> {

  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };
  public render(): React.ReactElement<IUpComingEventsProps> {
    return (
      <div className={styles.upComingEvents}>

        <h3>{this.props.title || Constants.Defaults.UpcomingEvents.Title}</h3>

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
      <div>
        <ul>
          {this.state.hasErrors
            ?
            this.renderError()
            :
            this.state.items && this.state.items.map((item: IUpComingEvent, key: any) => {
              return <UpComingEventItem item={item} key={key}></UpComingEventItem>;
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
      let listName = this.props.listName || Constants.Defaults.UpcomingEvents.ListName;
      let list = await ListDataManager.getUpcomingEventsData(listName);

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
