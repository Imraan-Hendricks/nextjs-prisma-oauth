import multer from 'multer';
import { accessFile, deleteFile } from '../../utils/file';
import { extractFilename, fileUpload, imageFilter, storage } from './helpers';
import { NotAcceptableError } from '../../utils/error';
import { UPLOADS_DIRECTORY } from '../../utils/env';

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
  const fileExists = await accessFile(filePath);
  if (fileExists) await deleteFile(filePath);
};
