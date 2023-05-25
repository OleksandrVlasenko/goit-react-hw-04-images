import React, { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { fetchImgsInstance } from 'utils/pixabay-request';
import { Message } from 'utils/message';
import './App.modules.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [searchingName, setSearchingName] = useState('');

  useEffect(() => {
    if (!currentPage) {
      return;
    }

    async function fetchData() {
      console.log('fetchData  currentPage:', currentPage);

      try {
        setLoading(true);

        fetchImgsInstance.page = currentPage;
        fetchImgsInstance.searchName = searchingName;

        const {
          data: { hits, totalHits },
        } = await fetchImgsInstance.getImgs();

        if (totalHits === 0) {
          Message.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setImages([]);
          setTotal(0);
          return;
        }

        const newImages = hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        if (currentPage === 1) {
          setImages(newImages);
        } else {
          setImages(prevImages => [...prevImages, ...newImages]);
        }

        setTotal(totalHits);
      } catch (error) {
        Message.failure(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage, searchingName]);

  return (
    <div className="App">
      <Searchbar setName={setSearchingName} onCurrentPage={setCurrentPage} />

      <ImageGallery images={images} />
      {total > currentPage * fetchImgsInstance.perPage && (
        <Button currentPage={currentPage} onCurrentPage={setCurrentPage} />
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
    </div>
  );
};
