import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    tags: {
      type: [String],
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    imported: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StoriesCollection = db.model('story', storySchema);
