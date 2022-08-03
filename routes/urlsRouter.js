import { Router } from 'express';
import { validateNewUrl } from '../middlewares/validateNewUrl.js';
import { validateShortUrl } from '../middlewares/validateShortUrl.js';
import { makeShortUrl, getUrlById, getShortUrl } from '../controllers/urlsController.js';

const router = Router();

router.post('/urls/shorten', validateNewUrl, makeShortUrl);
router.get('/urls/:id', validateShortUrl, getUrlById);
router.get('/urls/open/:shortUrl', validateShortUrl, getShortUrl);

export default router;