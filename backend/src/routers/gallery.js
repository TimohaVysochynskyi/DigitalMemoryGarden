import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { gallerySchema } from '../validation/validateGallery.js';

import {
  getAllGalleryItemsController,
  getGalleryItemByIdController,
  addGalleryItemController,
  updateGalleryItemController,
  deleteGalleryItemController,
} from '../controllers/gallery.js';

const router = Router();

router.get('/', ctrlWrapper(getAllGalleryItemsController));
router.get('/:id', isValidId, ctrlWrapper(getGalleryItemByIdController));
router.post(
  '/',
  upload.array('media'),
  authAdmin, // Перевірка адміністратора
  validateBody(gallerySchema),
  ctrlWrapper(addGalleryItemController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin, // Перевірка адміністратора
  validateBody(gallerySchema),
  ctrlWrapper(updateGalleryItemController),
);
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteGalleryItemController),
); // Видалення доступне лише адміну

export default router;
