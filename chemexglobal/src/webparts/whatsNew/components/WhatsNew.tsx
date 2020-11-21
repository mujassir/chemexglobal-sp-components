import * as React from 'react';
import styles from './WhatsNew.module.scss';
import { IWhatsNewProps } from './IWhatsNewProps';
import Constants from '../../../common/constants';
import Loader from 'react-loader-spinner';     //https://www.npmjs.com/package/react-loader-spinner
import ListDataManager from '../../../managers/list.data.manager';
import IWhatsNew from '../../../models/IWhatsNew';

export default class WhatsNew extends React.Component<IWhatsNewProps, {}> {

  public state = {
    isLoading: false,
    hasErrors: false,
    errors: null,
    items: null,
  };
  public render(): React.ReactElement<IWhatsNewProps> {
    return (
      <div className={styles.container}>

        <h3>{this.props.title || Constants.Defaults.WhatsNew.Title}</h3>

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
            this.renderWidget()
          }
        </ul>
      </div>

    );
  }

  private renderWidget() {

    if (this.state.items && this.state.items.length > 0) {
      let item: IWhatsNew = this.state.items[0];
      return (
        <ul>
          <li>
            <a href={item.NewsURL}>
              <img src={item.NewsImage} />
              <strong>
                {item.NewsDescription}
              </strong>
            </a>
          </li>
        </ul>
      );
    }

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
      let listName = this.props.listName || Constants.Defaults.WhatsNew.ListName;
      let list = await ListDataManager.getWhatsNewData(listName);

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
