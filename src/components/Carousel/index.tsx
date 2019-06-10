import React, { PureComponent, memo, RefObject } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import {isMobile} from "../..";

import "./Carousel.scss";

export type CarouselProps = {
  text: string[];
  images: Array<string>;
  play: boolean;
};

class Carousel extends PureComponent<CarouselProps, any> {
  private ref: RefObject<HTMLDivElement>;
  private gallery: RefObject<ImageGallery>;

  constructor(props: CarouselProps) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.ref = React.createRef();
    this.gallery = React.createRef();
  }

  public componentWillReceiveProps(props:CarouselProps) {
    if (this.gallery.current) {
      if (props.play) {
        this.gallery.current.play();  
      } else {
        this.gallery.current.pause();  
      }
    }
  }

  private renderItem(item: ReactImageGalleryItem) {
    return (
      <div
        className={
          "image-gallery-image" +
          (item.description ? " image-gallery-image__text" : "")
        }
      >
        <img src={item.original} alt={item.original} />
      </div>
    );
  }

  private getImages(): Array<ReactImageGalleryItem> {
    const images: Array<ReactImageGalleryItem> = this.props.images.map(
      image => ({ original: image })
    );

    return images;
  }

  render() {
    const images = this.getImages();

    return (
      <div className="carousel" ref={this.ref} onTouchStart={(e) => isMobile() && e.currentTarget.classList.toggle('hover')}>
        <div className="flipper">
        <ImageGallery
          items={images}
          ref={this.gallery}
          renderItem={this.renderItem}
          showBullets={images.length > 1}
          lazyLoad
          showThumbnails={false}
          showFullscreenButton={false}
          showNav={false}
          showPlayButton={false}
          useBrowserFullscreen={false}
          slideInterval={5000}
          slideDuration={0}
          autoPlay
        />
                <ul className="carousel--text show-on-small-only">
          {this.props.text.slice(1).map((text, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: text }} />
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default Carousel;
