import { useState, FunctionComponent, useEffect, useCallback, useRef, ReactElement } from 'react';
import Gallery, { type ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './carousel.css';
import { useOnInView } from 'react-intersection-observer';

export type CarouselProps = {
  text: ReactElement;
  images: Array<string>;
  play: boolean;
};

const CarouselItem: FunctionComponent<ReactImageGalleryItem> = ({ description, original }) => {
  return (
    <div className={'image-gallery-image' + (description ? ' image-gallery-image__text' : '')}>
      <img src={original} alt={original} loading="lazy" decoding="async" />
    </div>
  );
};

const Carousel: FunctionComponent<CarouselProps> = ({ images, text, play }) => {
  const carousel = useRef<HTMLDivElement>(null);
  const gallery = useRef<Gallery>(null);

  const [flipped, setFlipped] = useState(false);

  const flatImages: Array<ReactImageGalleryItem> = images.map((image) => ({
    original: image,
  }));

  const inview = useOnInView(
    (inView, entry) => {
      if (!window || !gallery.current) {
        return;
      }
      if (inView) {
        gallery.current.play();
      } else {
        gallery.current.pause();
      }
    },
    { threshold: 0.1, delay: 100 }
  );

  const flip = useCallback(() => {
    if (carousel.current) {
      carousel.current.classList.toggle('carousel--flipped');
      if (flipped) {
        gallery.current.play();
      } else {
        gallery.current.pause();
      }
      setFlipped(!flipped);
    }
  }, [carousel, flipped]);

  return (
    <>
      <div className="carousel" ref={carousel}>
        <div className="flipper" ref={inview}>
          <Gallery
            items={flatImages}
            ref={gallery}
            renderItem={(item: ReactImageGalleryItem) => <CarouselItem {...item} />}
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
          <div className="carousel--text">{text}</div>
        </div>
      </div>
      <button onClick={flip} className="carousel--flipper ">
        {flipped ? 'Screens' : 'Infos'}
      </button>
    </>
  );
};

export default Carousel;
