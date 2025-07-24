import { StoriesCollection } from '../models/story.js';
import { CategoriesCollection } from '../models/category.js';

// Helper to generate unique 8-digit flowerId
const generateFlowerId = async () => {
  let id;
  let exists = true;
  while (exists) {
    id = Math.floor(10000000 + Math.random() * 90000000).toString();
    exists = await StoriesCollection.exists({ flowerId: id });
  }
  return id;
};

export const createStory = async (payload) => {
  // Validate required fields
  if (!payload.title || !payload.category || !payload.source) {
    throw new Error('Missing required fields');
  }
  // Check if category exists
  const categoryExists = await CategoriesCollection.exists({
    _id: payload.category,
  });
  if (!categoryExists) throw new Error('Category not found');

  // Generate flowerId only for flower stories
  let flowerId;
  if (payload.source === 'flower') {
    flowerId = await generateFlowerId();
  }

  const story = await StoriesCollection.create({
    ...payload,
    ...(flowerId && { flowerId }),
  });
  return story;
};

export const getStoryById = async (id) => {
  const story = await StoriesCollection.findById(id);
  if (!story) return null;
  const category = story.category
    ? await CategoriesCollection.findById(story.category)
    : null;
  const result = story.toObject();
  result.category = category;
  return result;
};

export const getStoryByFlowerId = async (flowerId) => {
  const story = await StoriesCollection.findOne({ flowerId });
  if (!story) return null;
  const category = story.category
    ? await CategoriesCollection.findById(story.category)
    : null;
  const result = story.toObject();
  result.category = category;
  return result;
};

export const getAllStories = async (filter = {}, options = {}) => {
  // options: { sort: { createdAt: -1 } }
  return await StoriesCollection.find(filter).sort(options.sort || {});
};

export const updateStory = async (id, payload) => {
  return await StoriesCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteStory = async (id) => {
  return await StoriesCollection.findByIdAndDelete(id);
};

export const searchStories = async (query) => {
  if (typeof query !== 'string' || !query.trim()) return [];
  const regex = new RegExp(query, 'i');
  const stories = await StoriesCollection.find({
    $or: [
      { title: regex },
      { name: regex },
      { comment: regex },
      { location: regex },
    ],
  });
  // Populate category for each story
  return await Promise.all(
    stories.map(async (storyDoc) => {
      const story = storyDoc.toObject();
      if (story.category) {
        story.category = await CategoriesCollection.findById(story.category);
      }
      return story;
    }),
  );
};

// Get next story (by createdAt, source: 'flower')
export const getNextStory = async (createdAt) => {
  const next = await StoriesCollection.findOne({
    source: 'flower',
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(1);
  if (!next) return null;
  const story = next.toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};

// Get previous story (by createdAt, source: 'flower')
export const getPrevStory = async (createdAt) => {
  const prev = await StoriesCollection.findOne({
    source: 'flower',
    createdAt: { $lt: createdAt },
  })
    .sort({ createdAt: -1 })
    .limit(1);
  if (!prev) return null;
  const story = prev.toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};
// Get a random flower story (source: 'flower')
export const getRandomFlowerStory = async () => {
  const count = await StoriesCollection.countDocuments({ source: 'flower' });
  if (count === 0) return null;
  const random = Math.floor(Math.random() * count);
  const stories = await StoriesCollection.find({ source: 'flower' })
    .skip(random)
    .limit(1);
  if (!stories.length) return null;
  // Populate category for consistency
  const story = stories[0].toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};

// Get all stories by category, newest first
export const getStoriesByCategory = async (categoryId, page = 1, limit = 4) => {
  const skip = (page - 1) * limit;
  const [stories, totalCount] = await Promise.all([
    StoriesCollection.find({ category: categoryId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    StoriesCollection.countDocuments({ category: categoryId }),
  ]);
  const result = await Promise.all(
    stories.map(async (storyDoc) => {
      const story = storyDoc.toObject();
      if (story.category) {
        story.category = await CategoriesCollection.findById(story.category);
      }
      return story;
    }),
  );
  return { stories: result, totalCount };
};

// Отримати 4 історії з категорії навколо storyId (шуканий + сусіди)
export const getStoriesContextByCategory = async (
  categoryId,
  storyId,
  limit = 4,
) => {
  // 1. Знайти шукану історію
  const current = await StoriesCollection.findOne({
    _id: storyId,
    category: categoryId,
  });
  if (!current) return [];
  // 2. Знайти сусідів (новіші за шукану)
  const after = await StoriesCollection.find({
    category: categoryId,
    createdAt: { $gt: current.createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(limit - 1);
  // 3. Якщо не вистачає, добрати старіших
  let result = [current, ...after];
  if (result.length < limit) {
    const before = await StoriesCollection.find({
      category: categoryId,
      createdAt: { $lt: current.createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(limit - result.length);
    result = [current, ...after, ...before];
  }
  // 4. Відсортувати за createdAt (від новіших до старіших)
  result = result
    .map((doc) => doc.toObject())
    .sort((a, b) => b.createdAt - a.createdAt);
  // 5. Populate category
  for (const story of result) {
    if (story.category) {
      story.category = await CategoriesCollection.findById(story.category);
    }
  }
  return result;
};
