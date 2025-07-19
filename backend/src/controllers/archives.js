import createHttpError from "http-errors";

import {
  getAllArchiveStories,
  getArchiveStoryById,
  addArchiveStory,
  updateArchiveStory,
  deleteArchiveStory,
} from "../services/archives.js";

export const getAllArchiveStoriesController = async (req, res, next) => {
  const stories = await getAllArchiveStories();

  res.status(200).send(stories);
};

export const getArchiveStoryByIdController = async (req, res, next) => {
  const story = await getArchiveStoryById(req.params.id);
  if (!story) return res.status(404).send({ message: "Story not found" });
  res.status(200).send(story);
};

export const addArchiveStoryController = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    text: req.body.text,
    category: req.body.category,
    tags: req.body.tags,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
    date: new Date(),
    imported: req.body.imported,
  };

  const newStory = await addArchiveStory(payload);

  res.status(201).send(newStory);
};

export const updateArchiveStoryController = async (req, res, next) => {
  const updatedStory = await updateArchiveStory(req.params.id, req.body);
  if (!updatedStory)
    return res.status(404).send({ message: "Story not found" });
  res.status(200).send(updatedStory);
};

export const deleteArchiveStoryController = async (req, res, next) => {
  const deletedStory = await deleteArchiveStory(req.params.id);
  if (!deletedStory)
    return res.status(404).send({ message: "Story not found" });
  res.status(204).send();
};
