import './components/navbar.js';

import './pages/roles.js';
import './pages/users.js';

import { showAlert } from './components/alert.js';
import { loadCurrentView } from './initView.js';

const showErrors = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  if (error) {
    showAlert('error', error);
  }
};

showErrors();

setTimeout(async () => {
  await loadCurrentView();
}, 1500);
