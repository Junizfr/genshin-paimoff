import elementService from '../services/elementService.js';

export default {
  getAll: async (req, res) => {
    const elements = await elementService.getAll();
    res.status(elements.error ? 400 : 200).json(elements);
  },

  findById: async (req, res) => {
    const element = await elementService.getById(req.params.id);
    res.status(element.error ? 400 : 200).json(element);
  },

  create: async (req, res) => {
    const element = await elementService.create(req.body);
    res.status(element.errors ? 400 : 201).json(element);
  },

  update: async (req, res) => {
    const element = await elementService.update(req.params.id, req.body);
    res.status(element.error ? 400 : 200).json(element);
  },

  delete: async (req, res) => {
    const element = await elementService.delete(req.params.id);
    res.status(element.error ? 400 : 200).json(element);
  },
};
