import roleRepository from '../repositories/roleRepository.js';
import Role from '../models/role.js';

export default {
  getAll: async () => {
    return await roleRepository.all();
  },

  create: async (roleData) => {
    const { valid, errors } = await Role.validate(roleData);
    if (!valid) {
      return { errors: errors };
    }

    const newRole = new Role(roleData);
    return {
      success: 'Role created',
      data: await roleRepository.create(newRole),
    };
  },

  update: async (roleId, roleData) => {
    const role = new Role(await roleRepository.findById(roleId));
    const { valid, errors, updatableRows } = await Role.validate(
      roleData,
      true
    );
    if (!valid) {
      return { errors: errors };
    }

    const updateRole = new Role({
      id: role.id,
      name: updatableRows.name || role.name,
      icon: updatableRows.icon || role.icon,
      updatedAt: new Date(),
    });

    return await roleRepository.update(updateRole);
  },

  delete: async (roleId) => {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      return { error: 'Role not found' };
    }
    await roleRepository.delete(roleId);
    return {
      success: 'Role deleted',
      data: role,
    };
  },

  getById: async (roleId) => {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      return { error: 'Role not found' };
    }
    return role;
  },
};
