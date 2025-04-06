import roleService from '../services/roleService.js';

export default {
  getAll: async (req, res) => {
    const roles = await roleService.getAll();
    res.status(roles.error ? 400 : 200).json(roles);
  },

  findById: async (req, res) => {
    const role = await roleService.getById(req.params.id);
    res.status(role.error ? 400 : 200).json(role);
  },

  create: async (req, res) => {
    const role = await roleService.create(req.body);
    res.status(role.errors ? 400 : 201).json(role);
  },

  update: async (req, res) => {
    const role = await roleService.update(req.params.id, req.body);
    res.status(role.error ? 400 : 200).json(role);
  },

  delete: async (req, res) => {
    const role = await roleService.delete(req.params.id);
    res.status(role.error ? 400 : 200).json(role);
  },
};
