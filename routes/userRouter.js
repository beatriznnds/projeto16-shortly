import { Router } from 'express';
import { getMyUrls } from '../controllers/userController.js';
import { validateUser } from '../middlewares/dbValidation.js';

const router = Router();

router.get('/users/me', validateUser, getMyUrls)

export default router;