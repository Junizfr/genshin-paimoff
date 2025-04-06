import bcrypt from 'bcryptjs';
import { connection } from '../database.js';

export default {
  all: async () => {
    try {
      const users = await connection.all('SELECT * FROM users;');
      return { users };
    } catch (error) {
      return { errors: error.message };
    }
  },

  findById: async (id) => {
    try {
      const user = await connection.get('SELECT * FROM users WHERE id = ?;', [
        id,
      ]);
      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByUsername: async (username) => {
    try {
      const user = await connection.get(
        'SELECT * FROM users WHERE username = ?;',
        [username]
      );
      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await connection.get(
        'SELECT * FROM users WHERE email = ?;',
        [email]
      );
      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  create: async (user) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?);',
        [
          user.username,
          user.email,
          await bcrypt.hash(user.password, 10),
          user.avatar,
        ]
      );
      if (stmt.error) return { errors: stmt.error };
      const createdUser = await connection.get(
        'SELECT * FROM users WHERE id = ?;',
        [stmt.lastID]
      );
      return createdUser;
    } catch (error) {
      return { errors: error.message };
    }
  },

  update: async (user) => {
    try {
      const stmt = await connection.run(
        'UPDATE users SET username = ?, email = ?, password = ?, avatar = ? WHERE id = ?;',
        [user.username, user.email, user.password, user.avatar, user.id]
      );
      if (stmt.error) return { errors: stmt.error };
      const updatedUser = await connection.get(
        'SELECT * FROM users WHERE id = ?;',
        [user.id]
      );
      return updatedUser;
    } catch (error) {
      return { errors: error.message };
    }
  },

  delete: async (id) => {
    try {
      await connection.run('DELETE FROM users WHERE id = ?;', [id]);
      return { deleted: true };
    } catch (error) {
      return { errors: error.message };
    }
  },
};
