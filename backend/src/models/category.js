import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    flowerImage: {
      type: String, // шлях до картинки
      default: '',
    },
    flowerAnimation: {
      type: String, // шлях до відео
      default: '',
    },
    miniatureImage: {
      type: String, // шлях до мініатюри
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CategoriesCollection = db.model('category', categorySchema);
