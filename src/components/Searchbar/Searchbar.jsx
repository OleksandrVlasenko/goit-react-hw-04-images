import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

// import { fetchImgsInstance } from 'utils/pixabay-request';
import { Message } from 'utils/message';
import './Searchbar.modules.css';

export const Searchbar = ({ setName, onCurrentPage }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearchNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      Message.warning('Поле не має бути пустим');
      return;
    }

    setName(searchName.trim());
    onCurrentPage(1);

    setSearchName('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          onChange={handleSearchNameChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
        />
      </form>
    </header>
  );
};

Searchbar.propType = {
  setName: PropTypes.func.isRequired,
  onCurrentPage: PropTypes.func.isRequired,
};
