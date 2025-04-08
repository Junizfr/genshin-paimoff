import { showAlert } from '../components/alert.js';
import api from '../functions/api.js';
import { oneUser } from '../models/user.js';
import storage from '../functions/storage.js';

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

if (document.URL.endsWith('dashboard/users')) {
  const newUserButton = document.getElementById('newUserButton');
  newUserButton.addEventListener('click', async () => {
    window.location.href = `/dashboard/users/new`;
  });
  setTimeout(() => {
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');
    editButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const user = await oneUser(button.id.replace('editUser', ''));
        storage.setItem('user', JSON.stringify(user));
        window.location.href = `/dashboard/users/edit`;
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const userId = button.id.replace('deleteUser', '');
        const confirmation = confirm(
          'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
        );
        if (confirmation) {
          await deleteUser(userId);
        }
      });
    });
  }, 3000);
}

if (document.URL.includes('/users/edit')) {
  const user = JSON.parse(storage.getItem('user'));
  const userFormEdit = document.getElementById('userFormEdit');

  document.getElementById('username').value = user.username;
  document.getElementById('email').value = user.email;

  userFormEdit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(userFormEdit);
    const data = Object.fromEntries(formData.entries());
    const body = {};

    if (user.username !== data.username) {
      body.username = data.username;
    }
    if (user.email !== data.email) {
      body.email = data.email;
    }
    if (data.password) {
      body.password = data.password;
    }

    const response = await api.put(
      `http://localhost:3000/users/${user.id}`,
      body
    );

    if (response.errors) {
      let errors = '';
      if (response.errors.password) {
        errors += response.errors.password;
      }
      if (response.errors.username) {
        errors += response.errors.password
          ? `\n${response.errors.username}`
          : response.errors.username;
      }
      if (response.errors.email) {
        errors +=
          response.errors.password || response.errors.username
            ? `\n${response.errors.email}`
            : response.errors.email;
      }
      showAlert('error', errors.replace(/\n/g, '<br>'));
    } else {
      showAlert('success', 'Utilisateur modifié avec succès !');
      setTimeout(() => {
        window.location.href = '/dashboard/users';
      }, 1500);
    }
  });
}

async function deleteUser(id) {
  const response = await api.delete(`http://localhost:3000/users/${id}`);

  if (response.errors) {
    const errorMessage = response.errors.name;
    showAlert('error', errorMessage);
  } else {
    showAlert('success', 'Utilisateur supprimé avec succès !');
    setTimeout(() => {
      window.location.href = '/dashboard/users';
    }, 1500);
  }
}
