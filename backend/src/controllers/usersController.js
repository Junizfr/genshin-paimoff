import userService from '../services/userService.js';

export default {
  login: async (req, res) => {
    const user = await userService.login(req.body);
    if (user.token) {
      res.cookie('token', user.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
      });
    }
    res.status(user.error ? 400 : 200).json(user);
  },

  findById: async (req, res) => {
    const user = await userService.findById(req.params.id);
    if (user.error) {
      return res.status(400).json(user);
    }

    res.status(200).json(user);
  },

  me: async (req, res) => {
    const user = await userService.me(req.user.id);
    res.status(user.error ? 400 : 200).json(user);
  },

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
    if (user.error) {
      return res.status(400).json(user);
    }

    res.status(200).json(user);
  },
};
