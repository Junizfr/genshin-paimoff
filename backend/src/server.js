import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js';

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use('/', router);

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
