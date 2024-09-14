import express from 'express'
const router = express.Router();
import { createCatagory, updateCategory, removeCategory, listCategory,getCategory } from '../controllers/categoryController.js';

import { authorizeUser, authorizeAdmin } from '../middlewares/authMiddleware.js'


router.route('/')
    .post(authorizeUser, authorizeAdmin, createCatagory)
router.route('/categories').get(listCategory)
router.route('/:categoryId')
    .get(getCategory)
    .put(authorizeUser, authorizeAdmin, updateCategory)
    .delete(authorizeUser, authorizeAdmin, removeCategory)

export default router