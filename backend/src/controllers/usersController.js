import userService from '../services/userService.js';

export default {
  all: async (req, res) => {
    const users = await userService.getAll();
    res.status(users.error ? 400 : 200).json(users);
  },

  create: async (req, res) => {
    const user = await userService.create(req.body);

    if (user.errors) {
      return res.status(400).json(user);
    }

    res.status(201).json(user);
  },

  update: async (req, res) => {
    const user = await userService.update(req.params.id, req.body);
    if (user.errors) {
      return res.status(400).json(user);
    }

    res.status(200).json(user);
  },

  delete: async (req, res) => {
    const user = await userService.delete(req.params.id);
    if (!user.deleted) {
      return res.status(400).json(user);
    }

    res.status(200).json(user);
  },
};
