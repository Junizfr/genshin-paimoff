//import './components/navbar.js';

import { showAlert } from './components/alert.js';

const showErrors = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  if (error) {
    showAlert('error', error);
  }
};

showErrors();
