import createHttpError from 'http-errors';
import {
  createFlower,
  getFlowerByFlowerId,
  getNextFlower,
  getPrevFlower,
  searchFlowers,
} from '../services/flower.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { createDirIfNotExist } from '../utils/createDirIfNotExist.js';

// POST /flowers
export const createFlowerController = async (req, res, next) => {
  try {
    // Handle media files
    const media = {};
    if (req.files) {
      for (const file of req.files) {
        let folder;
        if (file.fieldname === 'photo') folder = 'images';
        else if (file.fieldname === 'audio') folder = 'audio';
        else if (file.fieldname === 'video') folder = 'video';
        if (folder) {
          await createDirIfNotExist(`uploads/${folder}`);
          media[file.fieldname] = await saveFileToUploadDir(file, folder);
        }
      }
    }
    const payload = {
      ...req.body,
      media,
      location: req.body.location || undefined,
      age: req.body.age ? Number(req.body.age) : undefined,
    };
    const flower = await createFlower(payload);
    res.status(201).send(flower);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

// GET /flowers/:flowerId
export const getFlowerByIdController = async (req, res, next) => {
  const flower = await getFlowerByFlowerId(req.params.flowerId);
  if (!flower) return res.status(404).send({ message: 'Flower not found' });
  res.status(200).send(flower);
};

// GET /flowers/:flowerId/next
export const getNextFlowerController = async (req, res, next) => {
  const flower = await getNextFlower(req.params.flowerId);
  if (!flower)
    return res.status(404).send({ message: 'Next flower not found' });
  res.status(200).send(flower);
};

// GET /flowers/:flowerId/prev
export const getPrevFlowerController = async (req, res, next) => {
  const flower = await getPrevFlower(req.params.flowerId);
  if (!flower)
    return res.status(404).send({ message: 'Previous flower not found' });
  res.status(200).send(flower);
};

// GET /flowers/search?query=...
export const searchFlowersController = async (req, res, next) => {
  const results = await searchFlowers(req.query.query);
  res.status(200).send(results);
};
