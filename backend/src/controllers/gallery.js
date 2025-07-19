import createHttpError from "http-errors";

import {
  getAllGalleryItems,
  getGalleryItemById,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../services/gallery.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const getAllGalleryItemsController = async (req, res, next) => {
  const galleryItems = await getAllGalleryItems();

  res.status(200).send(galleryItems);
};

export const getGalleryItemByIdController = async (req, res, next) => {
  const galleryItem = await getGalleryItemById(req.params.id);
  if (!galleryItem)
    return res.status(404).send({ message: "Gallery item not found" });
  res.status(200).send(galleryItem);
};

export const addGalleryItemController = async (req, res, next) => {
  const mediaPaths = await Promise.all(
    req.files.map((file) => saveFileToUploadDir(file, "gallery"))
  );

  const payload = {
    ...req.body,
    media: mediaPaths,
  };

  const newGalleryItem = await addGalleryItem(payload);
  res.status(201).send(newGalleryItem);
};

export const updateGalleryItemController = async (req, res, next) => {
  const updatedGalleryItem = await updateGalleryItem(req.params.id, req.body);
  if (!updatedGalleryItem)
    return res.status(404).send({ message: "Gallery item not found" });
  res.status(200).send(updatedGalleryItem);
};

export const deleteGalleryItemController = async (req, res, next) => {
  const deletedGalleryItem = await deleteGalleryItem(req.params.id);
  if (!deletedGalleryItem)
    return res.status(404).send({ message: "Gallery item not found" });
  res.status(204).send();
};
