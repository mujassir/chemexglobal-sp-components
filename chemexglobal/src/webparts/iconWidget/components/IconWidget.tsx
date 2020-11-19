import * as React from 'react';
import styles from './IconWidget.module.scss';
import { IIconWidgetProps } from './IIconWidgetProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Constants from '../../../common/constants';
import Loader from 'react-loader-spinner';     //https://www.npmjs.com/package/react-loader-spinner
import IIconWidget from '../../../models/IIconWidget';
import IconWidgetItem from './IconWidgetItem';
import ListDataManager from '../../../managers/list.data.manager';

export default class IconWidget extends React.Component<IIconWidgetProps, {}> {
  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };
  public render(): React.ReactElement<IIconWidgetProps> {
    return (
      <div className={styles.container}>

        <h3>{this.props.title || Constants.Defaults.IconWidget.Title}</h3>

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
            this.state.items && this.state.items.map((item: IIconWidget, key: any) => {
              return <IconWidgetItem item={item} key={key}></IconWidgetItem>;
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
      let listName = this.props.listName || Constants.Defaults.IconWidget.ListName;
      let list = await ListDataManager.getIconWidgetData(listName);

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
