import { showAlert } from '../components/alert.js';
import api from '../functions/api.js';

const newUserForm = document.getElementById('userFormNew');

if (document.URL.includes('/users/new') || document.URL.includes('/register')) {
  newUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(newUserForm);
    const data = Object.fromEntries(formData.entries());

    const response = await api.post('http://localhost:3000/users', data);

    if (response.errors) {
      const errorMessage = response.errors.name;
      showAlert('error', errorMessage);
    } else {
      showAlert('success', 'Compte créé avec succès !');
      setTimeout(() => {
        document.URL.includes('/register')
          ? (window.location.href = '/')
          : (window.location.href = '/dashboard/users');
      }, 1500);
    }
  });
}
