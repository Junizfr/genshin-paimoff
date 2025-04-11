import characterRepository from '../repositories/characterRepository.js';
import userRepository from '../repositories/userRepository.js';
import userCharacterRepository from '../repositories/usersCharacterRepository.js';

export default {
  getAll: async () => {
    return await userCharacterRepository.all();
  },

  assignCharacterToUser: async (userId, characterId) => {
    const existingCharacter = await characterRepository.findById(characterId);
    if (!existingCharacter) {
      return { error: 'Character not found' };
    }

    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      return { error: 'User not found' };
    }

    const existingRelation = await userCharacterRepository.findByUserId(userId);
    if (
      existingRelation.characters &&
      existingRelation.characters.some((rel) => rel.characterId === characterId)
    ) {
      return { error: 'Character already assigned to this user' };
    }

    const relation = await userCharacterRepository.assign({
      userId,
      characterId,
    });
    if (relation.errors) {
      return { errors: relation.errors };
    }

    return {
      success: 'Character assigned to user successfully',
      data: relation,
    };
  },

  removeCharacterFromUser: async (userId, characterId) => {
    const existingRelation = await userCharacterRepository.findByUserId(userId);

    if (
      !existingRelation ||
      !existingRelation.characters ||
      !Array.isArray(existingRelation.characters)
    ) {
      return { error: 'No characters found for this user' };
    }

    console.log('existingRelation:', existingRelation);

    const relation = existingRelation.characters.find(
      (rel) => rel.characterId === parseInt(characterId, 10)
    );

    if (!relation) {
      return { error: 'Relation not found' };
    }

    await userCharacterRepository.delete({ userId, characterId });

    return {
      success: 'Character removed from user successfully',
      data: relation,
    };
  },

  findByUserId: async (userId) => {
    const characters = await userCharacterRepository.findByUserId(userId);
    if (!characters) {
      return { error: 'No characters found for this user' };
    }
    return characters;
  },
};
