import roleService from './services/roleService.js';

const roles = {
  user: {
    name: 'User',
    icon: 'user.png',
  },
  admin: {
    name: 'Admin',
    icon: 'admin.png',
  },
};

const setupRoles = async () => {
  for (const role in roles) {
    await roleService.create(roles[role]);
  }
};

const main = async () => {
  await setupRoles();
};

main();
