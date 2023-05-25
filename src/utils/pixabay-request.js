import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 1000;

class fetchImgs {
  #AUTH_KEY = '35003886-1d9d7f8458bd91da816cc357a';

  options = {
    params: {
      key: this.#AUTH_KEY,
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 12,
    },
  };

  get searchName() {
    return this.options.params.q;
  }

  set searchName(newName) {
    this.options.params.q = newName;
  }

  get page() {
    return this.options.params.page;
  }

  set page(newPage) {
    this.options.params.page = newPage;
  }

  get perPage() {
    return this.options.params.per_page;
  }

  set perPage(newPerPage) {
    this.options.params.per_page = newPerPage;
  }

  async getImgs() {
    return await axios.request(this.options);
  }
}

export const fetchImgsInstance = new fetchImgs();

