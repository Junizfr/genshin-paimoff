import { connection } from '../database.js';
import { formatDate } from '../utils/date.js';

export default {
  all: async () => {
    try {
      const roles = await connection.all('SELECT * FROM roles;');
      return { roles };
    } catch (error) {
      return { errors: error.message };
    }
  },

  findById: async (id) => {
    try {
      const role = await connection.get('SELECT * FROM roles WHERE id = ?;', [
        id,
      ]);
      return role;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByName: async (name) => {
    try {
      const role = await connection.get('SELECT * FROM roles WHERE name = ?;', [
        name,
      ]);
      return role;
    } catch (error) {
      return { errors: error.message };
    }
  },

  create: async ({ name, icon }) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO roles (name, icon) VALUES (?, ?);',
        [name, icon]
      );
      if (stmt.error) return { errors: stmt.error };
      const createdRole = await connection.get(
        'SELECT * FROM roles WHERE id = ?;',
        [stmt.lastID]
      );
      return createdRole;
    } catch (error) {
      return { errors: error.message };
    }
  },

  update: async ({ id, name, icon }) => {
    try {
      const stmt = await connection.run(
        'UPDATE roles SET name = ?, icon = ?, updatedAt = ? WHERE id = ?;',
        [name, icon, formatDate(new Date()), id]
      );
      if (stmt.error) return { errors: stmt.error };
      const updatedRole = await connection.get(
        'SELECT * FROM roles WHERE id = ?;',
        [id]
      );
      return updatedRole;
    } catch (error) {
      return { errors: error.message };
    }
  },

  delete: async (id) => {
    try {
      const result = await connection.run('DELETE FROM roles WHERE id = ?;', [
        id,
      ]);

      if (result.changes > 0) {
        return { success: true };
      }

      return { errors: 'Role not found' };
    } catch (error) {
      return { errors: error.message };
    }
  },
};
