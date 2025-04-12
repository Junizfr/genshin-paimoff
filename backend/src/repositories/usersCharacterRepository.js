import { connection } from '../database.js';

export default {
  all: async () => {
    try {
      const relations = await connection.all('SELECT * FROM users_characters;');
      return { relations };
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByUserId: async (userId) => {
    try {
      const characters = await connection.all(
        `SELECT uc.characterId, c.name, c.icon, c.rarity, c.gender, c.release 
         FROM users_characters uc
         INNER JOIN characters c ON uc.characterId = c.id
         WHERE uc.userId = ?;`,
        [userId]
      );
      return { characters };
    } catch (error) {
      return { errors: error.message };
    }
  },

  assign: async ({ userId, characterId }) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO users_characters (userId, characterId) VALUES (?, ?);',
        [userId, characterId]
      );

      if (stmt.error) return { errors: stmt.error };

      const relation = await connection.get(
        'SELECT * FROM users_characters WHERE userId = ? AND characterId = ?;',
        [userId, characterId]
      );

      return relation;
    } catch (error) {
      return { errors: error.message };
    }
  },

  delete: async ({ userId, characterId }) => {
    try {
      const result = await connection.run(
        'DELETE FROM users_characters WHERE userId = ? AND characterId = ?;',
        [userId, characterId]
      );

      if (result.changes > 0) {
        return { success: true };
      }

      return { errors: 'Relation not found' };
    } catch (error) {
      return { errors: error.message };
    }
  },
};
