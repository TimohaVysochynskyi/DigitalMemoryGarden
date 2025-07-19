import Joi from 'joi';

export const gallerySchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Заголовок повинен бути текстом.',
    'string.empty': 'Заголовок не може бути порожнім.',
    'any.required': 'Заголовок є обов’язковим полем.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Опис повинен бути текстом.',
    'string.empty': 'Опис не може бути порожнім.',
    'any.required': 'Опис є обов’язковим полем.',
  }),
  contentType: Joi.string()
    .valid('image', 'video', 'audio')
    .required()
    .messages({
      'string.base': 'Тип контенту повинен бути текстом.',
      'any.only': "Тип контенту може бути лише 'image', 'video' або 'audio'.",
      'any.required': 'Тип контенту є обов’язковим полем.',
    }),
  category: Joi.string().required().messages({
    'string.base': 'Категорія повинна бути текстом.',
    'string.empty': 'Категорія не може бути порожньою.',
    'any.required': 'Категорія є обов’язковим полем.',
  }),
  name: Joi.string().messages({
    'string.base': "Ім'я повинно бути текстом.",
  }),
  location: Joi.string().required().messages({
    'string.base': 'Локація повинна бути текстом.',
    'string.empty': 'Локація не може бути порожньою.',
    'any.required': 'Локація є обов’язковим полем.',
  }),
  date: Joi.date().default(new Date()).messages({
    'date.base': 'Дата повинна бути коректною датою.',
  }),
  imported: Joi.boolean().default(false).messages({
    'boolean.base': 'Imported повинен бути булевим значенням.',
  }),
});
