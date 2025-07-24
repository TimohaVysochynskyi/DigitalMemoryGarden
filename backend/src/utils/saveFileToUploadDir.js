import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR, API_DOMAIN } from '../constants/index.js';

export const saveFileToUploadDir = async (file, folder) => {
  const newFilePath = path.join(UPLOAD_DIR, folder, file.filename);

  await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), newFilePath);

  return `${API_DOMAIN}/uploads/${folder}/${file.filename}`;
};
