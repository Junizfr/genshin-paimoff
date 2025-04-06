import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = await open({
  filename: process.env.SQLITE_FILE,
  driver: sqlite3.Database,
});

export default {
  db: async () => {
    return db;
  },

  close: async () => {
    console.log('Closing database connection...');
    try {
      await db.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  },
};
