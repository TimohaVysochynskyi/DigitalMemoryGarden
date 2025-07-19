import { StoriesCollection } from "../models/story.js";

export const getAllArchiveStories = async () => {
  return await StoriesCollection.find();
};

export const getArchiveStoryById = async (id) => {
  return await StoriesCollection.findById(id);
};

export const addArchiveStory = async (payload) => {
  return await StoriesCollection.create(payload);
};

export const updateArchiveStory = async (id, payload) => {
  return await StoriesCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteArchiveStory = async (id) => {
  return await StoriesCollection.findByIdAndDelete(id);
};
