import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../services/category.js';

export const getAllCategoriesController = async (req, res, next) => {
  const categories = await getAllCategories();
  res.status(200).send(categories);
};

export const addCategoryController = async (req, res, next) => {
  const newCategory = await addCategory(req.body);
  res.status(201).send(newCategory);
};

export const updateCategoryController = async (req, res, next) => {
  const updatedCategory = await updateCategory(req.params.id, req.body);
  if (!updatedCategory)
    return res.status(404).send({ message: 'Category not found' });
  res.status(200).send(updatedCategory);
};

export const deleteCategoryController = async (req, res, next) => {
  const deletedCategory = await deleteCategory(req.params.id);
  if (!deletedCategory)
    return res.status(404).send({ message: 'Category not found' });
  res.status(204).send();
};
