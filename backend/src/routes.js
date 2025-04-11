import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware.js';

import pagesController from './controllers/pagesController.js';
import usersController from './controllers/usersController.js';
import rolesController from './controllers/rolesController.js';
import elementsController from './controllers/elementsController.js';
import charactersController from './controllers/charactersController.js';
import userCharacterController from './controllers/userCharacterController.js';

const router = Router();

router.get('/', pagesController.home);

router.post('/login', usersController.login);

router.get('/users', usersController.all);
router.get('/users/:id', usersController.findById);
router.post('/users', usersController.create);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

router.get('/roles', rolesController.getAll);
router.get('/roles/:id', rolesController.findById);
router.post('/roles', rolesController.create);
router.put('/roles/:id', rolesController.update);
router.delete('/roles/:id', rolesController.delete);

router.get('/elements', elementsController.getAll);
router.get('/elements/:id', elementsController.findById);
router.post('/elements', elementsController.create);
router.put('/elements/:id', elementsController.update);
router.delete('/elements/:id', elementsController.delete);

router.get('/characters', charactersController.getAll);
router.get('/characters/:id', charactersController.findById);
router.post('/characters', charactersController.create);
router.put('/characters/:id', charactersController.update);
router.delete('/characters/:id', charactersController.delete);

router.get(
  '/users-characters/all',
  authMiddleware,
  userCharacterController.getAll
);
router.post(
  '/users-characters/assign',
  authMiddleware,
  userCharacterController.assignCharacterToUser
);
router.delete(
  '/users-characters/remove/:characterId',
  authMiddleware,
  userCharacterController.removeCharacterFromUser
);
router.get(
  '/users-characters',
  authMiddleware,
  userCharacterController.findByUserId
);

router.get('/me', authMiddleware, usersController.me);

export default router;
