import express from 'express';
//controllers
import { register, login, secret } from '../controllers/auth.js';
//middlewares
import { requireSignIn, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/secret', requireSignIn, isAdmin, secret);

export default router;