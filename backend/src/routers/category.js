import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authAdmin } from '../middlewares/authAdmin.js';

import {
  getAllCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.js';

const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));
router.post('/', authAdmin, ctrlWrapper(addCategoryController));
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(updateCategoryController),
);
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteCategoryController),
);

export default router;
