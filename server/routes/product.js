import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin } from '../middlewares/auth.js';
import { create, list, read, photo, remove, update } from '../controllers/product.js';

const router = express.Router();

router.post('/product', requireSignIn, isAdmin, formidable(), create);
router.get('/products', list);
router.get('/product/:slug', read);
router.get('/product/photo/:productId', photo);
router.delete('/product/:productId', requireSignIn, isAdmin, remove);
router.put('/product/:productId', requireSignIn, isAdmin, formidable(), update);

export default router;

