import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Message } from 'utils/message';
import { fetchImgsInstance } from 'utils/pixabay-request';
import './Button.modules.css';

export class Button extends Component {
  handleSubmit = async () => {
    const { onSubmit, images, toogleLoader } = this.props;

    fetchImgsInstance.page += 1;

    toogleLoader();

    try {
      const {
        data: { hits, totalHits },
      } = await fetchImgsInstance.getImgs();

      onSubmit([...images, ...hits], totalHits);

      if (totalHits <= fetchImgsInstance.page * fetchImgsInstance.perPage) {
        Message.success('There are no more images to show');
      }
    } catch (error) {
      Message.failure(error.message);
    }

    toogleLoader();
  };

  render() {
    return (
      <button onClick={this.handleSubmit} className="Button" type="button">
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  toogleLoader: PropTypes.func.isRequired,
};