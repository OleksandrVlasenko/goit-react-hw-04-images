import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import { Message } from 'utils/message';
import { fetchImgsInstance } from 'utils/pixabay-request';
import './Searchbar.modules.css';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSearchNameChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { searchName } = this.state;

    if (searchName.trim() === '') {
      Message.warning('Поле не має бути пустим');
      return;
    }

    fetchImgsInstance.page = 1;
    fetchImgsInstance.searchName = searchName;

    this.props.toogleLoader();

    try {
      const {
        data: { hits, totalHits },
      } = await fetchImgsInstance.getImgs();

      this.props.onSubmit(hits, totalHits);

      if (totalHits === 0) {
        Message.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.props.toogleLoader();
        return;
      }

      this.setState({ searchName: '' });
    } catch (error) {
      Message.failure(error.message);
    }

    this.props.toogleLoader();
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <ImSearch />
          </button>

          <input
            onChange={this.handleSearchNameChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
  toogleLoader: PropTypes.func.isRequired,
};
