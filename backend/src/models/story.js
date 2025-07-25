import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    comment: { type: String, trim: true },
    name: { type: String, trim: true },
    age: { type: Number, min: 0 },
    location: { type: String, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    createdAt: { type: Date, default: Date.now, immutable: true },
    media: {
      photo: { type: String },
      audio: { type: String },
      video: { type: String },
    },
    flowerId: {
      type: String,
      unique: true,
      sparse: true,
      match: /^\d{8}$/,
    },
    source: {
      type: String,
      enum: ['flower', 'archive'],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const StoriesCollection = db.model('story', storySchema);
