import React from 'react';
import PropTypes from 'prop-types';

import './Button.modules.css';

export const Button = ({ currentPage, onCurrentPage }) => {
  const handleSubmit = () => {
    onCurrentPage(currentPage + 1);
  };

  return (
    <button onClick={handleSubmit} className="Button" type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onCurrentPage: PropTypes.func.isRequired,
};
