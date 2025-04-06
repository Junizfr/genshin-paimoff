import { Router } from 'express';

import pagesController from './controllers/pagesController.js';

const router = Router();

router.get('/', pagesController.home);

export default router;
