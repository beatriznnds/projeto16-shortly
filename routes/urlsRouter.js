import { Router } from 'express';
import schemaValidation from '../middlewares/schemasValidation.js';
import { validateShortUrl, validateShortUrlById, validateUserUrl } from '../middlewares/dbValidation.js';
import { makeShortUrl, getUrlById, getShortUrl, deleteUrl } from '../controllers/urlsController.js';
import { validateToken } from '../middlewares/tokenValidation.js';
import urlSchema from '../schemas/urlSchema.js'

const router = Router();

router.post('/urls/shorten', schemaValidation(urlSchema), validateToken, makeShortUrl);
router.get('/urls/:id', validateShortUrlById, getUrlById);
router.get('/urls/open/:shortUrl', validateShortUrl, getShortUrl);
router.delete('/urls/:id', validateUserUrl, deleteUrl);

export default router;