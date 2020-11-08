const API_KEY = '18977229-7092af5d4460397c12f37767a';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return this.getData(url).then(response => {
      this.incrementPage();
      return response.hits;
    });
  }
  async countCards() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this._page}&per_page=12&key=${API_KEY}`;
    return this.getData(url).then(response => {
      return response.totalHits;
    });
  }
  async getData(url) {
    const response = await fetch(url);
    const images = await response.json();
    return images;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// return fetch(url)
//   .then(response => response.json())
//   .then(({ hits }) => {
//     this.incrementPage();
//     return hits;
//   });
