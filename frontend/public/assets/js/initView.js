import { showContentLoader } from './functions/loader.js';
import { all } from './models/role.js';

const views = {
  roles: async () => {
    if (
      document.URL.endsWith('/edit') ||
      document.URL.endsWith('/delete') ||
      document.URL.endsWith('/new')
    ) {
      return;
    }
    const rolesBody = document.querySelector('#roles-body');
    showContentLoader(true); // active le loader au début

    try {
      const { roles } = await all();
      rolesBody.innerHTML = ''; // clear
      roles.forEach((dataRole) => {
        const html = `
        <tr>
          <td>${dataRole.id}</td>
          <td>${dataRole.name}</td>
          <td class="actions-cell">
            <button class="action-icon edit" id="editRole${dataRole.id}">                                
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="action-icon delete" id="deleteRole${dataRole.id}">                               
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </td>
        </tr>
        `;
        rolesBody.innerHTML += html;
      });
    } catch (err) {
      console.error('Erreur lors du chargement des rôles :', err);
      rolesBody.innerHTML = `<tr><td colspan="3">Erreur de chargement</td></tr>`;
    } finally {
      showContentLoader(false); // désactive le loader
    }
  },
};

export async function loadCurrentView() {
  const currentPath = document.URL;
  Object.keys(views).forEach((view) => {
    if (currentPath.includes(view)) {
      views[view]();
    }
  });
}
