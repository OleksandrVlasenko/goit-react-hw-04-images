import React, { Component } from 'react';
import { Grid } from 'react-loader-spinner';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { fetchImgsInstance } from 'utils/pixabay-request';
import './App.modules.css';

export class App extends Component {
  state = {
    images: [],
    total: 0,
    showModal: false,
    largeImageURL: '',
    alt: '',
    loading: false,
  };

  handleSubmit = (hits, totalHits) => {
    this.setState({ images: hits, total: totalHits });
  };

  getlargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };

  getAlt = alt => {
    this.setState({ alt });
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  toogleLoader = () => {
    this.setState(({ loading }) => ({
      loading: !loading,
    }));
  };

  render() {
    const { images, total, showModal, largeImageURL, alt, loading } =
      this.state;
    return (
      <div className="App">
        <Searchbar
          onSubmit={this.handleSubmit}
          toogleLoader={this.toogleLoader}
        />

        <ImageGallery
          images={images}
          onClick={this.toogleModal}
          getAlt={this.getAlt}
          getlargeImageURL={this.getlargeImageURL}
        />
        {total > fetchImgsInstance.page * fetchImgsInstance.perPage && (
          <Button
            onSubmit={this.handleSubmit}
            images={images}
            toogleLoader={this.toogleLoader}
          />
        )}
        <Grid
          height="40"
          width="40"
          color="#3f51b5"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="Loader"
          visible={loading}
        />
        {showModal && (
          <Modal
            onClose={this.toogleModal}
            largeImageURL={largeImageURL}
            alt={alt}
          />
        )}
      </div>
    );
  }
}
