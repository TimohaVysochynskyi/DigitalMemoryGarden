import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { archiveSchema } from '../validation/validateArchive.js';

import {
  getAllArchiveStoriesController,
  getArchiveStoryByIdController,
  addArchiveStoryController,
  updateArchiveStoryController,
  deleteArchiveStoryController,
} from '../controllers/archives.js';

const router = Router();

router.get('/', ctrlWrapper(getAllArchiveStoriesController));
router.get('/:id', isValidId, ctrlWrapper(getArchiveStoryByIdController));
router.post(
  '/',
  validateBody(archiveSchema),
  ctrlWrapper(addArchiveStoryController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin, // Перевірка адміністратора
  validateBody(archiveSchema),
  ctrlWrapper(updateArchiveStoryController),
);
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteArchiveStoryController),
); // Видалення доступне лише адміну

export default router;
