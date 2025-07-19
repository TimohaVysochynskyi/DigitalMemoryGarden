import Joi from 'joi';
import mongoose from 'mongoose';

const flowerSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': "Поле 'title' має бути рядком.",
    'string.empty': "Поле 'title' є обов’язковим.",
    'string.min': "Довжина 'title' має бути від 3 до 100 символів.",
    'string.max': "Довжина 'title' має бути від 3 до 100 символів.",
    'any.required': "Поле 'title' є обов’язковим.",
  }),
  comment: Joi.string().max(2000).optional().messages({
    'string.base': "Поле 'comment' має бути рядком.",
    'string.max': "Довжина 'comment' не повинна перевищувати 2000 символів.",
  }),
  name: Joi.string().max(100).optional().messages({
    'string.base': "Поле 'name' має бути рядком.",
    'string.max': "Довжина 'name' не повинна перевищувати 100 символів.",
  }),
  age: Joi.number().integer().min(0).max(120).optional().messages({
    'number.base': "Поле 'age' має бути числом.",
    'number.integer': "Поле 'age' має бути цілим числом.",
    'number.min': "Значення 'age' не може бути менше 0.",
    'number.max': "Значення 'age' не може бути більше 120.",
  }),
  location: Joi.string().max(200).optional().messages({
    'string.base': "Поле 'location' має бути рядком.",
    'string.max': "Довжина 'location' не повинна перевищувати 200 символів.",
  }),
  category: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'string.base': "Поле 'category' має бути рядком.",
      'any.required': "Поле 'category' є обов’язковим.",
      'any.invalid': 'Недійсний формат категорії.',
    }),
});

export default flowerSchema;
