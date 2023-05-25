import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import './ImageGalleryItem.modules.css';

export const ImageGalleryItem = ({
  imageLink,
  imageDescription,
  largeImageURL,
}) => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const toogleOpenModal = () => {
    setIsOpenModal(!isModalOpen);
  };
  return (
    <>
      <li className="ImageGalleryItem" onClick={toogleOpenModal}>
        <img
          className="ImageGalleryItem-image"
          src={imageLink}
          alt={imageDescription}
        />
      </li>
      {isModalOpen && (
        <Modal
          onClose={toogleOpenModal}
          largeImageURL={largeImageURL}
          alt={imageDescription}
        />
      )}
    </>
  );
};

ImageGalleryItem.propType = {
  imageLink: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
