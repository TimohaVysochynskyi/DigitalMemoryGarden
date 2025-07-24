import { getStoriesContextByCategoryController } from '../controllers/story.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { validateBody } from '../middlewares/validateBody.js';
import { storySchema } from '../validation/validateStory.js';

import {
  createStoryController,
  getStoryByIdController,
  getStoryByFlowerIdController,
  getAllStoriesController,
  updateStoryController,
  deleteStoryController,
  searchStoriesController,
  getRandomFlowerStoryController,
  getStoriesByCategoryController,
  getNextStoryController,
  getPrevStoryController,
} from '../controllers/story.js';

const router = Router();

// POST /stories (multipart/form-data, max 1 photo, 1 audio, 1 video)
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  validateBody(storySchema),
  ctrlWrapper(createStoryController),
);

// GET /stories/random-flower
router.get('/random-flower', ctrlWrapper(getRandomFlowerStoryController));

// GET /stories/category/:categoryId/context/:storyId
router.get(
  '/category/:categoryId/context/:storyId',
  ctrlWrapper(getStoriesContextByCategoryController),
);

// GET /stories/category/:categoryId
router.get(
  '/category/:categoryId',
  ctrlWrapper(getStoriesByCategoryController),
);

// GET /stories/:id
router.get('/:id', isValidId, ctrlWrapper(getStoryByIdController));

// GET /stories/flower/:flowerId
router.get('/flower/:flowerId', ctrlWrapper(getStoryByFlowerIdController));

// GET /stories
router.get('/', ctrlWrapper(getAllStoriesController));

// PATCH /stories/:id
router.patch('/:id', isValidId, authAdmin, ctrlWrapper(updateStoryController));

// DELETE /stories/:id
router.delete('/:id', isValidId, authAdmin, ctrlWrapper(deleteStoryController));

// POST /stories/search
router.post('/search', ctrlWrapper(searchStoriesController));

// POST /stories/next
router.post('/next', ctrlWrapper(getNextStoryController));

// POST /stories/prev
router.post('/prev', ctrlWrapper(getPrevStoryController));

export default router;
