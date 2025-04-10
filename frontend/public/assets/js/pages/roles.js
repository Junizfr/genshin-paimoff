import { showAlert } from '../components/alert.js';
import api from '../functions/api.js';
import storage from '../functions/storage.js';
import { oneRole } from '../models/role.js';

const newRoleForm = document.getElementById('roleFormNew');

if (document.URL.includes('/roles/new')) {
  newRoleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(newRoleForm);
    const data = Object.fromEntries(formData.entries());

    const response = await api.post('http://localhost:3000/roles', data);

    if (response.errors) {
      const errorMessage = response.errors.name;
      showAlert('error', errorMessage);
    } else {
      showAlert('success', 'Role créé avec succès !');
      setTimeout(() => {
        window.location.href = '/dashboard/roles';
      }, 1500);
    }
  });
}

if (document.URL.endsWith('dashboard/roles')) {
  const newRoleButton = document.getElementById('newRoleButton');
  newRoleButton.addEventListener('click', async () => {
    window.location.href = `/dashboard/roles/new`;
  });
  setTimeout(() => {
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');
    editButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const role = await oneRole(button.id.replace('editRole', ''));
        storage.setItem('role', JSON.stringify(role));
        window.location.href = `/dashboard/roles/edit`;
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const roleId = button.id.replace('deleteRole', '');
        const confirmation = confirm(
          'Êtes-vous sûr de vouloir supprimer ce rôle ?'
        );
        if (confirmation) {
          await deleteRole(roleId);
        }
      });
    });
  }, 3000);
}

if (document.URL.includes('/roles/edit')) {
  const role = JSON.parse(storage.getItem('role'));
  const editRoleForm = document.getElementById('roleFormEdit');

  document.getElementById('name').value = role.name;

  const select = document.getElementById('iconSelect');
  const icons = ['user.png', 'admin.png'];
  icons.forEach((icon) => {
    const option = document.createElement('option');
    option.value = icon === 'user.png' ? 'user' : 'admin';
    option.textContent = icon === 'user.png' ? 'Utilisateur' : 'Administrateur';
    if (icon === role.icon) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  editRoleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(editRoleForm);
    const data = Object.fromEntries(formData.entries());
    const body = {};

    if (role.name !== data.name) {
      body.name = data.name;
    }
    if (role.icon !== data.icon) {
      body.icon = data.icon;
    }

    const response = await api.put(
      `http://localhost:3000/roles/${role.id}`,
      body
    );

    if (response.errors) {
      const errorMessage = response.errors.name;
      showAlert('error', errorMessage);
    } else {
      showAlert('success', 'Role modifié avec succès !');
      setTimeout(() => {
        window.location.href = '/dashboard/roles';
      }, 1500);
    }
  });
}

async function deleteRole(id) {
  const response = await api.delete(`http://localhost:3000/roles/${id}`);

  if (response.errors) {
    const errorMessage = response.errors.name;
    showAlert('error', errorMessage);
  } else {
    showAlert('success', 'Role supprimé avec succès !');
    setTimeout(() => {
      window.location.href = '/dashboard/roles';
    }, 1500);
  }
}
