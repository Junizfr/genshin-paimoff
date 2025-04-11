import Character from '../models/character.js';
import characterRepository from '../repositories/characterRepository.js';

export default {
  getAll: async () => {
    return await characterRepository.all();
  },

  create: async (characterData) => {
    const { valid, errors } = await Character.validate(characterData);
    if (!valid) {
      return { errors: errors };
    }

    const newCharacter = new Character(characterData);
    return {
      success: 'Character created',
      data: await characterRepository.create(newCharacter),
    };
  },

  update: async (characterId, characterData) => {
    let character = await characterRepository.findById(characterId);
    if (!character) {
      return { error: 'Character not found' };
    }

    character = new Character(character);

    const { valid, errors, updatableRows } = await Character.validate(
      characterData,
      true
    );

    if (!valid) {
      return { errors };
    }
    const updateCharacter = new Character({
      id: character.id,
      name: updatableRows.name || character.name,
      vision: updatableRows.vision || character.vision.id,
      gender: updatableRows.gender || character.gender,
      rarity: updatableRows.rarity || character.rarity,
      release: updatableRows.release || character.release,
      icon: updatableRows.icon || character.icon,
      updatedAt: new Date(),
    });

    return await characterRepository.update(updateCharacter);
  },

  findById: async (characterId) => {
    const character = await characterRepository.findById(characterId);
    if (!character) {
      return { error: 'Character not found' };
    }
    return character;
  },

  delete: async (characterId) => {
    const character = await characterRepository.findById(characterId);
    if (!character) {
      return { error: 'Character not found' };
    }
    await characterRepository.delete(characterId);
    return {
      success: 'Character deleted',
      data: character,
    };
  },
};
