import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.modules.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, alt }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlebackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handlebackdropClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
