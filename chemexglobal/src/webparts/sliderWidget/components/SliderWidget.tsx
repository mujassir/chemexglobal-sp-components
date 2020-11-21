import * as React from 'react';
import styles from './SliderWidget.module.scss';
import { ISliderWidgetProps } from './ISliderWidgetProps';
import Constants from '../../../common/constants';
import {
  Carousel,
  CarouselButtonsDisplay,
  CarouselButtonsLocation,
  CarouselIndicatorShape
} from "@pnp/spfx-controls-react/lib/Carousel";
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import ListDataManager from '../../../managers/list.data.manager';
import ISliderImage from '../../../models/ISliderImage';

export default class SliderWidget extends React.Component<ISliderWidgetProps, {}> {

  public state = {
    sliderImages: null
  };
  public async componentDidMount() {
    let listName = this.props.listName || Constants.Defaults.SliderWidget.ListName;
    let list = await ListDataManager.getSliderWidgetData(listName);
    let carouselEvements = list.map((p: ISliderImage) => {
      return {
        imageSrc: p.EventImage,
        title: p.EventName,
        description: p.EventDescription,
        url: p.EventURL,
        showDetailsOnHover: true,
        imageFit: ImageFit.cover
      };
    });
    this.setState({ sliderImages: carouselEvements });
  }

  public render(): React.ReactElement<ISliderWidgetProps> {
    return (
      <div className={styles.sliderWidget}>
        {this.state.sliderImages
          ?
          <Carousel
            buttonsLocation={CarouselButtonsLocation.center}
            buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
            contentContainerStyles={styles.carouselImageContent}
            isInfinite={true}
            indicatorShape={CarouselIndicatorShape.circle}
            pauseOnHover={true}

            element={this.state.sliderImages}
            onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
            onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
          />
          : (null)
        }
      </div>
    );
  }
}
