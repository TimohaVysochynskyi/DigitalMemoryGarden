import { Router } from 'express';
import { env } from '../utils/env.js';

import archivesRouter from './archives.js';
import galleryRouter from './gallery.js';
import categoryRouter from './category.js';

const router = Router();

router.use('/archives', archivesRouter);
router.use('/gallery', galleryRouter);
router.use('/categories', categoryRouter);

// Ендпоінт для логіну адміністратора
router.post('/admin/login', (req, res, next) => {
  const adminPassword = env('ADMIN_PASSWORD');
  const providedPassword = req.headers['x-admin-password'];
  if (!providedPassword || providedPassword !== adminPassword) {
    return next(createHttpError(403, 'Incorrect admin password'));
  }

  res.status(200).send({ message: 'Successful login!' });
});

export default router;
