import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { validateNewUser } from '../middlewares/dbValidation.js';
import { signUp, signIn } from '../controllers/authController.js';
import newUserSchema from '../schemas/newUserSchema.js';
import signInSchema  from '../schemas/signInSchema.js';

const router = Router();

router.post('/signup', schemaValidation(newUserSchema), validateNewUser, signUp);
router.post('/signin', schemaValidation(signInSchema), signIn);

export default router;