import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes.js';
import database from './database.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', router);

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
  try {
    database.init();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await database.close();
  process.exit();
});
