import { Router } from 'express';
import { validateNewUrl } from '../middlewares/validateNewUrl.js';
import { validateShortUrl, validateShortUrlById } from '../middlewares/validateShortUrl.js';
import { makeShortUrl, getUrlById, getShortUrl, deleteUrl } from '../controllers/urlsController.js';
import { validateUserUrl } from '../middlewares/validateUserUrl.js';

const router = Router();

router.post('/urls/shorten', validateNewUrl, makeShortUrl);
router.get('/urls/:id', validateShortUrlById, getUrlById);
router.get('/urls/open/:shortUrl', validateShortUrl, getShortUrl);
router.delete('/urls/:id', validateUserUrl, deleteUrl);

export default router;