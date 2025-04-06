import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

export const connection = await open({
  filename: process.env.SQLITE_FILE,
  driver: sqlite3.Database,
});

export default {
  close: async () => {
    console.log('Closing database connection...');
    try {
      await connection.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  },

  init: async () => {
    const createRoles = `
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        icon TEXT DEFAULT 'user.png',
        createdAt DATETIME DEFAULT (datetime('now')),
        updatedAt DATETIME DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS roles_index_name ON roles (name);
    `;

    const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT DEFAULT 'none.png',
        role INTEGER,
        createdAt DATETIME DEFAULT (datetime('now')),
        updatedAt DATETIME DEFAULT (datetime('now')),
        FOREIGN KEY (role) REFERENCES roles(id)
      );

      CREATE INDEX IF NOT EXISTS users_index_username ON users (username);
      CREATE INDEX IF NOT EXISTS users_index_email ON users (email);
    `;

    try {
      console.log('Initializing database...');
      await connection.run('PRAGMA foreign_keys = ON;');
      await connection.run(createRoles);
      await connection.run(createUsers);
      console.log('Database initialized.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },
};
