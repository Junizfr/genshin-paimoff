import { showAlert } from '../components/alert.js';
import api from '../functions/api.js';
import storage from '../functions/storage.js';
import { one } from '../models/role.js';

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
        const role = await one(button.id.replace('editRole', ''));
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

  editRoleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(editRoleForm);
    const data = Object.fromEntries(formData.entries());

    const response = await api.put(
      `http://localhost:3000/roles/${role.id}`,
      data
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
