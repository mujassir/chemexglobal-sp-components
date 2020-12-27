import * as React from 'react';
import styles from './RecentNews.module.scss';
import { IRecentNewsProps } from './IRecentNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ListDataManager from '../../../managers/list.data.manager';
import Constants from '../../../common/constants';
import RecentNewsItem from './RecentNewsItem';
import Loader from 'react-loader-spinner';     //https://www.npmjs.com/package/react-loader-spinner
import IRecentNews from '../../../models/IRecentNews';

export default class RecentNews extends React.Component<IRecentNewsProps, {}> {
  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };

  public render(): React.ReactElement<IRecentNewsProps> {
    return (
      <div className={styles.recentNews}>
        <h3>{this.props.title || Constants.Defaults.RecentNews.Title}</h3>

        {this.state.isLoading ? this.renderLoader() : this.renderListData()}
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
            ? this.renderError()
            : this.state.items &&
              this.state.items.map((item: IRecentNews, key: any) => {
                return <RecentNewsItem item={item} key={key}></RecentNewsItem>;
              })}
        </ul>
      </div>
    );
  }

  private renderError() {
    return <div className={styles.error}>{this.state.errors}</div>;
  }

  public componentDidMount() {
    this.loadListData();
  }

  private async loadListData() {
    try {
      this.setState({ isLoading: true, hasErrors: false });
      let listName = this.props.listName || Constants.Defaults.RecentNews.ListName;
      let list = await ListDataManager.getRecentNewsData(listName);

      this.setState({
        isLoading: false,
        items: list,
      });
    } catch (error) {
      console.log("Get List data error: ", error);
      this.setState({
        isLoading: false,
        hasErrors: true,
        errors: Constants.Errors.ListError,
      });
    }
  }
}
