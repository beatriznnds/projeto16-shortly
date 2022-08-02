import { Router } from 'express';
import { validateNewUser } from '../middlewares/validateNewUser.js';
import { validateSignIn } from '../middlewares/validateSignIn.js';
import { signUp, signIn } from '../controllers/userController.js';
const router = Router();

router.post('/signup', validateNewUser, signUp);
router.post('/signin', validateSignIn, signIn)

export default router;