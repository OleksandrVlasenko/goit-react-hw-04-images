import React from 'react';
import PropTypes from 'prop-types';

import "./ImageGalleryItem.modules.css"

export const ImageGalleryItem = ({
  imageLink,
  imageDescription,
  onClick,
  getAlt,
  getlargeImageURL,
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        onClick();
        getAlt();
        getlargeImageURL();
      }}
    >
      <img
        className="ImageGalleryItem-image"
        src={imageLink}
        alt={imageDescription}
      />
    </li>
  );
};

ImageGalleryItem.propType = {
  imageLink: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  getAlt: PropTypes.func.isRequired,
  getlargeImageURL: PropTypes.func.isRequired,
};