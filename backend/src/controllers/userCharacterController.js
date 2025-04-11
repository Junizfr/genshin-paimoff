import userCharacterService from '../services/userCharacterService.js';

export default {
  getAll: async (req, res) => {
    try {
      const result = await userCharacterService.getAll();
      if (result.errors) {
        return res.status(500).json({ errors: result.errors });
      }
      res.status(200).json(result.relations || result.characters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  assignCharacterToUser: async (req, res) => {
    const { characterId } = req.body;

    if (!characterId) {
      return res.status(400).json({ error: 'characterId is required' });
    }

    try {
      const result = await userCharacterService.assignCharacterToUser(
        req.user.id,
        characterId
      );
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeCharacterFromUser: async (req, res) => {
    const { characterId } = req.params;

    if (!characterId) {
      return res.status(400).json({ error: 'characterId is required' });
    }

    try {
      const result = await userCharacterService.removeCharacterFromUser(
        req.user.id,
        characterId
      );
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findByUserId: async (req, res) => {
    try {
      const result = await userCharacterService.findByUserId(req.user.id);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
