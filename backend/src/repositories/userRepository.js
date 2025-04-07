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
      const user = await connection.get(
        `
        SELECT 
          users.id,
          users.username,
          users.email,
          users.password,
          users.avatar,
          json_object(
            'id', roles.id,
            'name', roles.name,
            'icon', roles.icon
          ) AS role,
          users.createdAt,
          users.updatedAt
        FROM users
        LEFT JOIN roles ON users.role = roles.id
        WHERE users.id = ?;
      `,
        [id]
      );

      if (user?.role) {
        user.role = JSON.parse(user.role);
      }

      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByUsername: async (username) => {
    try {
      const user = await connection.get(
        `
        SELECT 
          users.id,
          users.username,
          users.email,
          users.password,
          users.avatar,
          json_object(
            'id', roles.id,
            'name', roles.name,
            'icon', roles.icon
          ) AS role,
          users.createdAt,
          users.updatedAt
        FROM users
        LEFT JOIN roles ON users.role = roles.id
        WHERE users.username = ?;
      `,
        [username]
      );

      if (user?.role) {
        user.role = JSON.parse(user.role);
      }

      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await connection.get(
        `
        SELECT 
          users.id,
          users.username,
          users.email,
          users.password,
          users.avatar,
          json_object(
            'id', roles.id,
            'name', roles.name,
            'icon', roles.icon
          ) AS role,
          users.createdAt,
          users.updatedAt
        FROM users
        LEFT JOIN roles ON users.role = roles.id
        WHERE users.email = ?;
      `,
        [email]
      );

      if (user?.role) {
        user.role = JSON.parse(user.role);
      }

      return user;
    } catch (error) {
      return { errors: error.message };
    }
  },

  create: async ({ username, email, password, avatar, role }) => {
    try {
      const stmt = await connection.run(
        'INSERT INTO users (username, email, password, avatar, role) VALUES (?, ?, ?, ?, ?);',
        [username, email, await bcrypt.hash(password, 10), avatar, role]
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

  update: async ({ id, username, email, password, avatar, role }) => {
    try {
      const stmt = await connection.run(
        'UPDATE users SET username = ?, email = ?, password = ?, role = ?, avatar = ? WHERE id = ?;',
        [username, email, password, avatar, role, id]
      );
      if (stmt.error) return { errors: stmt.error };
      const updatedUser = await connection.get(
        'SELECT * FROM users WHERE id = ?;',
        [id]
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
