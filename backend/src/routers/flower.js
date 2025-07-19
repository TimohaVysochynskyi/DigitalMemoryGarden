import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authAdmin } from '../middlewares/authAdmin.js';

import {
  createFlowerController,
  getFlowerByIdController,
  getNextFlowerController,
  getPrevFlowerController,
  searchFlowersController,
} from '../controllers/flower.js';
import { validateBody } from '../middlewares/validateBody.js';
import flowerSchema from '../validation/validateFlower.js';

const router = Router();

// POST /flowers (multipart/form-data, max 1 photo, 1 audio, 1 video)
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  validateBody(flowerSchema),
  ctrlWrapper(createFlowerController),
);

// GET /flowers/:flowerId
router.get('/:flowerId', ctrlWrapper(getFlowerByIdController));

// GET /flowers/:flowerId/next
router.get('/:flowerId/next', ctrlWrapper(getNextFlowerController));

// GET /flowers/:flowerId/prev
router.get('/:flowerId/prev', ctrlWrapper(getPrevFlowerController));

// GET /flowers/search?query=...
router.get('/search', ctrlWrapper(searchFlowersController));

export default router;
