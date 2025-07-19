import { FlowersCollection } from '../models/flower.js';
import { CategoriesCollection } from '../models/category.js';

// Helper to generate unique 8-digit flowerId
const generateFlowerId = async () => {
  let id;
  let exists = true;
  while (exists) {
    id = Math.floor(10000000 + Math.random() * 90000000).toString();
    exists = await FlowersCollection.exists({ flowerId: id });
  }
  return id;
};

export const createFlower = async (payload) => {
  // Validate required fields
  if (!payload.title || !payload.category) {
    throw new Error('Missing required fields: title or category');
  }
  // Check if category exists
  const categoryExists = await CategoriesCollection.exists({
    _id: payload.category,
  });
  if (!categoryExists) {
    throw new Error('Category not found');
  }
  // Generate unique flowerId
  const flowerId = await generateFlowerId();
  const flower = await FlowersCollection.create({ ...payload, flowerId });
  return flower;
};

export const getFlowerByFlowerId = async (flowerId) => {
  const flower = await FlowersCollection.findOne({ flowerId });
  if (!flower) return null;
  // Manual population of category
  const category = flower.category
    ? await CategoriesCollection.findById(flower.category)
    : null;
  console.log(category);
  const result = flower.toObject();
  result.category = category;
  return result;
};

export const getNextFlower = async (flowerId) => {
  const current = await FlowersCollection.findOne({ flowerId });
  if (!current) return null;
  const next = await FlowersCollection.findOne({
    createdAt: { $gt: current.createdAt },
  }).sort({ createdAt: 1 });
  if (!next) return null;
  const category = next.category
    ? await CategoriesCollection.findById(next.category)
    : null;
  const result = next.toObject();
  result.category = category;
  return result;
};

export const getPrevFlower = async (flowerId) => {
  const current = await FlowersCollection.findOne({ flowerId });
  if (!current) return null;
  const prev = await FlowersCollection.findOne({
    createdAt: { $lt: current.createdAt },
  }).sort({ createdAt: -1 });
  if (!prev) return null;
  const category = prev.category
    ? await CategoriesCollection.findById(prev.category)
    : null;
  const result = prev.toObject();
  result.category = category;
  return result;
};

export const searchFlowers = async (query) => {
  if (!query) return [];
  const regex = new RegExp(query, 'i');
  return await FlowersCollection.find({
    $or: [
      { title: regex },
      { name: regex },
      { comment: regex },
      { location: regex },
    ],
  });
};
