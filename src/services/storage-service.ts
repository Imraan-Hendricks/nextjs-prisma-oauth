import multer from 'multer';
import path from 'path';
import { deleteFileIfExists, mkdirIfNotExists } from '@/utils/file-utils';
import {
  fileUpload,
  generateFilename,
  imageFilter,
  LocalFile,
  validateMulterFile,
} from '@/utils/storage-utils';
import { NotAcceptableError } from '@/utils/error-utils';
import { UPLOADS_DIRECTORY } from '@/utils/env-utils';

const uploadAvatar = async (req: any, res: any) => {
  const destination = path.join(UPLOADS_DIRECTORY, 'avatars');
  await mkdirIfNotExists(destination);

  const options = {
    fileFilter: imageFilter,
    limits: { fileSize: 4000000 },
    storage: multer.diskStorage({
      destination: async (req, file, cb) => cb(null, destination),
      filename: (req, file, cb) => cb(null, generateFilename(file)),
    }),
  };

  const upload = multer(options).single('avatar');

  const { file } = await fileUpload(upload)(req, res);
  if (!file) throw new NotAcceptableError('Avatar is a required field');

  const multerFile = validateMulterFile(file);
  const localFile: LocalFile = {
    ...multerFile,
    location: `/api/users/avatars/${multerFile.filename}`,
  };

  return localFile;
};

export const storageService = {
  uploadAvatar,
  deleteFileIfExists,
};
