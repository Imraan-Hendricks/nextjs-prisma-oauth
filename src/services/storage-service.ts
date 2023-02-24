import multer from 'multer';
import { deleteFileIfExists } from '@/utils/file-utils';
import {
  extractFilename,
  fileUpload,
  imageFilter,
  storage,
} from '@/utils/storage-utils';
import { NotAcceptableError } from '@/utils/error-utils';
import { UPLOADS_DIRECTORY } from '@/utils/env-utils';

export const uploadStaticAvatar = async (req: any, res: any) => {
  const options = {
    fileFilter: imageFilter,
    limits: { fileSize: 4000000 },
    storage: storage('avatars'),
  };

  const upload = multer(options).single('avatar');
  await fileUpload(upload)(req, res);

  const file = req.file as Express.Multer.File | undefined;
  if (!file) throw new NotAcceptableError('Avatar is a required field');

  return file;
};

export const deleteStaticAvatar = async (image: string) => {
  const bucketName = 'avatars';
  const filename = extractFilename(image);
  const filePath = `${UPLOADS_DIRECTORY}/${bucketName}/${filename}`;
  await deleteFileIfExists(filePath);
};
