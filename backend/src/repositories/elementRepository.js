import { connection } from '../database.js';
import { formatDate } from '../utils/date.js';

export default {
  all: async () => {
    try {
      const elements = await connection.all('SELECT * FROM elements;');
      return { elements };
    } catch (error) {
      return { errors: error.message };
    }
  },

  findById: async (id) => {
    try {
      const element = await connection.get(
        'SELECT * FROM elements WHERE id = ?;',
        [id]
      );
      return element;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByName: async (name) => {
    try {
      const element = await connection.get(
        'SELECT * FROM elements WHERE name = ?;',
        [name]
      );
      return element;
    } catch (error) {
      return { errors: error.message };
    }
  },

  create: async ({ name, icon }) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO elements (name, icon) VALUES (?, ?);',
        [name, icon]
      );
      if (stmt.error) return { errors: stmt.error };
      const createdElement = await connection.get(
        'SELECT * FROM elements WHERE id = ?;',
        [stmt.lastID]
      );
      return createdElement;
    } catch (error) {
      return { errors: error.message };
    }
  },

  update: async ({ id, name, icon }) => {
    try {
      const stmt = await connection.run(
        'UPDATE elements SET name = ?, icon = ?, updatedAt = ? WHERE id = ?;',
        [name, icon, formatDate(new Date()), id]
      );
      if (stmt.error) return { errors: stmt.error };
      const updatedElement = await connection.get(
        'SELECT * FROM elements WHERE id = ?;',
        [id]
      );
      return updatedElement;
    } catch (error) {
      return { errors: error.message };
    }
  },

  delete: async (id) => {
    try {
      const result = await connection.run(
        'DELETE FROM elements WHERE id = ?;',
        [id]
      );

      if (result.changes > 0) {
        return { success: true };
      }

      return { errors: 'Element not found' };
    } catch (error) {
      return { errors: error.message };
    }
  },
};
