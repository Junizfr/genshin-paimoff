import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware.js';

import pagesController from './controllers/pagesController.js';
import usersController from './controllers/usersController.js';

const router = Router();

router.get('/', pagesController.home);

router.post('/login', usersController.login);

router.get('/users', usersController.all);
router.post('/users', usersController.create);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

router.get('/me', authMiddleware, usersController.me);

export default router;
