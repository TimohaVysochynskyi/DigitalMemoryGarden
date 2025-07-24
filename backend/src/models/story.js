import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const storySchema = new mongoose.Schema(
  {
    // Common fields
    title: { type: String, required: true, trim: true },
    comment: { type: String, trim: true }, // main text
    name: { type: String, trim: true },
    age: { type: Number, min: 0 },
    location: { type: String, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    createdAt: { type: Date, default: Date.now, immutable: true },

    // Media (optional, only for flower stories)
    media: {
      photo: { type: String },
      audio: { type: String },
      video: { type: String },
    },

    // Unique flowerId (optional, only for flower stories)
    flowerId: {
      type: String,
      unique: true,
      sparse: true,
      match: /^\d{8}$/,
    },

    // Source: 'flower' | 'archive'
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
