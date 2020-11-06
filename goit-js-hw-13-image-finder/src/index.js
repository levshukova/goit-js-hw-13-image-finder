import './styles.css';
import ImageApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import cardTmpl from './templates/cardTmpl.hbs';
import 'material-design-icons/iconfont/material-icons.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const imageApiService = new ImageApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearCardsContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();

  imageApiService.fetchImages().then(cards => {
    appendCardsMarkup(cards);
    loadMoreBtn.enable();
    window.scrollTo({
      top: refs.galleryContainer.scrollHeight,
      behavior: 'smooth',
    });
  });
}
function appendCardsMarkup(cards) {
  const markup = cardTmpl(cards);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearCardsContainer() {
  refs.galleryContainer.innerHTML = '';
}
