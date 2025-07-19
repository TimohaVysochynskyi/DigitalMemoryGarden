import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const flowerSchema = new mongoose.Schema(
  {
    flowerId: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{8}$/,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      default: undefined,
      trim: true,
    },
    name: {
      type: String,
      default: undefined,
      trim: true,
    },
    age: {
      type: Number,
      default: undefined,
      min: 0,
    },
    location: {
      type: String,
      default: undefined,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    media: {
      photo: { type: String, default: undefined },
      audio: { type: String, default: undefined },
      video: { type: String, default: undefined },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    versionKey: false,
  },
);

export const FlowersCollection = db.model('flower', flowerSchema);
