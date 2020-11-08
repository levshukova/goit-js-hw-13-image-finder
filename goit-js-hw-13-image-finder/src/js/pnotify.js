import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function onInputError() {
  error({
    title: 'Oops...',
    text: 'Please, check your query',
    delay: 2000,
    animation: 'fade',
  });
}

function emptyInput() {
  error({
    title: 'Oops...',
    text: 'Query is empty. Try again!',
    delay: 2000,
    animation: 'fade',
  });
}

export default { onInputError, emptyInput };
