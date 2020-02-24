import React, {
  RefObject,
  useState,
  FunctionComponent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./Carousel.scss";

export type CarouselProps = {
  text: any;
  images: Array<string>;
  play: boolean;
};

const CarouselItem: FunctionComponent<ReactImageGalleryItem> = ({
  description,
  original
}) => {
  return (
    <div
      className={
        "image-gallery-image" +
        (description ? " image-gallery-image__text" : "")
      }
    >
      <img src={original} alt={original} />
    </div>
  );
};

const Carousel: FunctionComponent<CarouselProps> = ({ images, text, play }) => {
  const carousel: RefObject<HTMLDivElement> = useRef(null);
  const gallery: RefObject<ImageGallery> = useRef(null);

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (play) {
      gallery.current.play();
    } else {
      gallery.current.pause();
    }
  }, [play]);

  const flatImages: Array<ReactImageGalleryItem> = images.map(image => ({
    original: image
  }));

  const flip = useCallback(
    () => {
      if (carousel.current) {
        carousel.current.classList.toggle("carousel--flipped");

        setFlipped(!flipped);
      }
    },
    [carousel, flipped]
  );

  return (
    <>
      <div className="carousel" ref={carousel}>
        <div className="flipper">
          <ImageGallery
            items={flatImages}
            ref={gallery}
            renderItem={item => <CarouselItem {...item} />}
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
					<div className="carousel--text show-on-medium-and-down">
						{text}
					</div>
        </div>
      </div>
      <button
        onClick={flip}
        className="carousel--flipper "
      >
        {flipped ? 'Screens' : 'Infos'}
      </button>
    </>
  );
};

export default Carousel;
