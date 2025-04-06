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
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT 'none.png',
      createdAt DATETIME DEFAULT (datetime('now')),
      updated DATETIME DEFAULT (datetime('now'))
      );
      
      CREATE INDEX IF NOT EXISTS USERS_index_username ON users (username);
      CREATE INDEX IF NOT EXISTS USERS_index_email ON users (email);
    `;

    try {
      console.log('Initializing database...');
      await connection.run('PRAGMA foreign_keys = ON;');
      await connection.run(createUserTable);
      console.log('Database initialized.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },
};
