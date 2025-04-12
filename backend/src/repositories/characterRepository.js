import { connection } from '../database.js';
import { formatDate } from '../utils/date.js';

export default {
  all: async () => {
    try {
      const characters = await connection.all('SELECT * FROM characters;');
      return { characters };
    } catch (error) {
      return { errors: error.message };
    }
  },

  findById: async (id) => {
    try {
      const character = await connection.get(
        'SELECT characters.id, characters.name, elements.name AS vision, characters.gender, characters.rarity, characters.release, characters.icon FROM characters INNER JOIN elements ON characters.vision = elements.id WHERE characters.id = ?;',
        [id]
      );
      return character;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByName: async (name) => {
    try {
      const character = await connection.get(
        'SELECT * FROM characters WHERE name = ?;',
        [name]
      );
      return character;
    } catch (error) {
      return { errors: error.message };
    }
  },

  create: async ({ name, vision, gender, rarity, release, icon }) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO characters (name, vision, gender, rarity, release, icon) VALUES (?, ?, ?, ?, ?, ?);',
        [name, vision, gender, rarity, release, icon]
      );
      if (stmt.error) return { errors: stmt.error };
      const createdCharacter = await connection.get(
        'SELECT * FROM characters WHERE id = ?;',
        [stmt.lastID]
      );
      return createdCharacter;
    } catch (error) {
      return { errors: error.message };
    }
  },

  update: async ({ id, name, vision, gender, rarity, release, icon }) => {
    try {
      const fields = [];
      const values = [];

      if (name !== undefined) {
        fields.push('name = ?');
        values.push(name);
      }
      if (vision !== undefined) {
        const visionCheck = await connection.get(
          'SELECT id FROM elements WHERE id = ?',
          [vision]
        );
        if (!visionCheck) {
          return {
            errors: "L'élément spécifié n'existe pas dans la base de données.",
          };
        }

        fields.push('vision = ?');
        values.push(vision);
      }
      if (gender !== undefined) {
        fields.push('gender = ?');
        values.push(gender);
      }
      if (rarity !== undefined) {
        fields.push('rarity = ?');
        values.push(rarity);
      }
      if (release !== undefined) {
        fields.push('release = ?');
        values.push(release);
      }
      if (icon !== undefined) {
        fields.push('icon = ?');
        values.push(icon);
      }

      // Toujours mettre à jour updatedAt
      fields.push('updatedAt = ?');
      values.push(formatDate(new Date()));

      values.push(id); // pour WHERE id = ?

      const query = `UPDATE characters SET ${fields.join(', ')} WHERE id = ?;`;
      const stmt = await connection.run(query, values);

      if (stmt.error) return { errors: stmt.error };

      const updatedUser = await connection.get(
        'SELECT * FROM characters WHERE id = ?;',
        [id]
      );

      return updatedUser;
    } catch (error) {
      return { errors: error.message };
    }
  },

  delete: async (id) => {
    try {
      const result = await connection.run(
        'DELETE FROM characters WHERE id = ?;',
        [id]
      );

      if (result.changes > 0) {
        return { success: true };
      }

      return { errors: 'Character not found' };
    } catch (error) {
      return { errors: error.message };
    }
  },
};
