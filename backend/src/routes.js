import { Router } from 'express';

import pagesController from './controllers/pagesController.js';
import usersController from './controllers/usersController.js';

const router = Router();

router.get('/', pagesController.home);

router.get('/users', usersController.all);
router.post('/users', usersController.create);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

export default router;
