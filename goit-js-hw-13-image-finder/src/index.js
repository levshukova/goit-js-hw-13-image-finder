import './styles.css';
import ImageApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import cardTmpl from './templates/cardTmpl.hbs';
import error from './js/pnotify';

import 'material-design-icons/iconfont/material-icons.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

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
refs.galleryContainer.addEventListener('click', onModalOpen);

function onSearch(e) {
  e.preventDefault();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    error.emptyInput();
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearCardsContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    refs.galleryContainer.scrollHeight,
    document.body.offsetHeight,
    refs.galleryContainer.offsetHeight,
    document.body.clientHeight,
    refs.galleryContainer.clientHeight,
  );
  try {
    imageApiService.countCards().then(totalHits => {
      if (totalHits === 0) {
        error.onInputError();
        return;
      }
      imageApiService.fetchImages().then(data => {
        appendCardsMarkup(data);
        loadMoreBtn.enable();

        if (imageApiService.page > 2) {
          window.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function appendCardsMarkup(cards) {
  const markup = cardTmpl(cards);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearCardsContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onModalOpen(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const modalMarkup = `
    <img src=${e.target.dataset.source} width="800" height="600">
`;
  const instance = basicLightbox.create(modalMarkup);

  instance.show();
}

//   imageApiService.fetchImages().then(cards => {
//   appendCardsMarkup(cards);
//   loadMoreBtn.enable();
//   if (imageApiService.page > 2) {
//     window.scrollTo({
//       top: scrollHeight,
//       behavior: 'smooth',
//     });
//   }
//  });
