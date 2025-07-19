import { GalleryCollection } from "../models/gallery.js";

export const getAllGalleryItems = async () => {
  return await GalleryCollection.find();
};

export const getGalleryItemById = async (id) => {
  return await GalleryCollection.findById(id);
};

export const addGalleryItem = async (payload) => {
  return await GalleryCollection.create(payload);
};

export const updateGalleryItem = async (id, payload) => {
  return await GalleryCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteGalleryItem = async (id) => {
  return await GalleryCollection.findByIdAndDelete(id);
};
