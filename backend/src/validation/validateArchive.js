import Joi from 'joi';

export const archiveSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Заголовок повинен бути текстом.',
    'string.empty': 'Заголовок не може бути порожнім.',
    'any.required': 'Заголовок є обов’язковим полем.',
  }),
  text: Joi.string().required().messages({
    'string.base': 'Текст повинен бути текстом.',
    'string.empty': 'Текст не може бути порожнім.',
    'any.required': 'Текст є обов’язковим полем.',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Категорія повинна бути текстом.',
    'string.empty': 'Категорія не може бути порожньою.',
    'any.required': 'Категорія є обов’язковим полем.',
  }),
  tags: Joi.array().items(Joi.string()).messages({
    'array.base': 'Теги повинні бути масивом текстових значень.',
  }),
  name: Joi.string().messages({
    'string.base': "Ім'я повинно бути текстом.",
  }),
  age: Joi.number().messages({
    'number.base': 'Вік повинен бути числом.',
  }),
  city: Joi.string().messages({
    'string.base': 'Місто повинно бути текстом.',
  }),
  date: Joi.date().default(new Date()).messages({
    'date.base': 'Дата повинна бути коректною датою.',
  }),
  imported: Joi.boolean().default(false).messages({
    'boolean.base': 'Imported повинен бути булевим значенням.',
  }),
});
