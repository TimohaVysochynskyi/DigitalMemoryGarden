import Joi from 'joi';
import mongoose from 'mongoose';

export const storySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  comment: Joi.string().max(2000).allow('', null),
  name: Joi.string().max(100).allow('', null),
  age: Joi.number().integer().min(0).max(120).allow(null),
  location: Joi.string().max(200).allow('', null),
  category: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  source: Joi.string().valid('flower', 'archive').required(),
});
