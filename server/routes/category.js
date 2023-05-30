import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/auth.js';
import { create, update, remove, list, read } from '../controllers/category.js';

const router = express.Router();

router.post('/category', requireSignIn, isAdmin, create);
router.put('/category/:categoryId', requireSignIn, isAdmin, update);
router.delete('/category/:categoryId', requireSignIn, isAdmin, remove);
router.get('/categories', list);
router.get('/category/:slug', read);

export default router;

