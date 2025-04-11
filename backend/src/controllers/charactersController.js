import characterService from '../services/characterService.js';

export default {
  getAll: async (req, res) => {
    const characters = await characterService.getAll();
    res.status(characters.error ? 400 : 200).json(characters);
  },

  findById: async (req, res) => {
    const character = await characterService.findById(req.params.id);
    res.status(character.error ? 400 : 200).json(character);
  },

  create: async (req, res) => {
    const character = await characterService.create(req.body);
    res.status(character.errors ? 400 : 201).json(character);
  },

  update: async (req, res) => {
    const character = await characterService.update(req.params.id, req.body);
    res.status(character.error ? 400 : 200).json(character);
  },

  delete: async (req, res) => {
    const character = await characterService.delete(req.params.id);
    res.status(character.error ? 400 : 200).json(character);
  },
};
