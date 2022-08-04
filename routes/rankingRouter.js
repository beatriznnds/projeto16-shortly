import { Router } from 'express';
import { getViews } from '../controllers/rankingController.js';


const router = Router();

router.get('/ranking', getViews);

export default router;