import React from 'components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.modules.css';

export const ImageGallery = ({ images, onClick, getAlt, getlargeImageURL }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imageLink={webformatURL}
          imageDescription={tags}
          onClick={onClick}
          getAlt={() => getAlt(id)}
          getlargeImageURL={() => getlargeImageURL(largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  getAlt: PropTypes.func.isRequired,
  getlargeImageURL: PropTypes.func.isRequired,
};
