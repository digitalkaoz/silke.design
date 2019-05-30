import React, { PureComponent, memo, RefObject } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import {isMobile} from "../..";

import "./Carousel.scss";

export type CarouselProps = {
  text: string;
  images: Array<string>;
  play: boolean;
};

class Carousel extends PureComponent<CarouselProps, any> {
  private ref: RefObject<HTMLDivElement>;
  private gallery: RefObject<ImageGallery>;

  constructor(props: CarouselProps) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.init = this.init.bind(this);
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

  private init(): void {
    if (!isMobile() || !this.ref.current) {
      return;
    }
    const textSlides: NodeListOf<
      HTMLDivElement
    > = this.ref.current.querySelectorAll(".image-gallery-image__text");
    textSlides.forEach(slide => {
      if (
        this.ref.current &&
        this.ref.current.getBoundingClientRect().height >
          slide.getBoundingClientRect().height
      ) {
        slide.style.height = this.ref.current.clientHeight.toString() + "px";
      }
    });
  }

  private renderItem(item: ReactImageGalleryItem) {
    const text = (item.description as unknown) as Array<string>; //TODO hackity hack, we sadly hijack the description field

    return (
      <div
        className={
          "image-gallery-image" +
          (item.description ? " image-gallery-image__text" : "")
        }
      >
        {item.description ? (
          <ul>
            {text.slice(1).map((line: string, i: number) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </ul>
        ) : (
          <img src={item.original} alt={item.original} />
        )}
      </div>
    );
  }

  private getImages(): Array<ReactImageGalleryItem> {
    const images: Array<ReactImageGalleryItem> = this.props.images.map(
      image => ({ original: image })
    );

    if (isMobile()) {
      images.push({ description: this.props.text });
    }

    return images;
  }

  render() {
    const images = this.getImages();
    return (
      <div className="carousel" ref={this.ref}>
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
          onSlide={this.init}
          autoPlay
        />
      </div>
    );
  }
}

export default Carousel;
