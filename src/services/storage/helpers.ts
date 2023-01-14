import multer from 'multer';
import path from 'path';
import { accessFile, mkdir } from '../../utils/file';
import {
  GenericError,
  InternalServerError,
  NotAcceptableError,
} from '../../utils/error';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { UPLOADS_DIRECTORY } from '../../utils/env';

export const extractFilename = (fileUrl: string) =>
  fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

export const fileUpload =
  (upload: (req: any, res: any, cb: (error: any) => void) => void) =>
  (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      upload(req, res, (error: any) => {
        if (error instanceof multer.MulterError)
          return reject(new InternalServerError(error.message));
        if (error) {
          if (error instanceof GenericError) return reject(error);
          return reject(new InternalServerError());
        }
        resolve();
      });
    });

export const imageFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb(new NotAcceptableError(`${file.fieldname} must be an image`));
};

const filenameGenerator = (file: Express.Multer.File) =>
  file.fieldname + '-' + randomUUID() + path.extname(file.originalname);

export const storage = (bucketName: string) =>
  multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const destination = path.join(UPLOADS_DIRECTORY, bucketName);
        const fileExists = await accessFile(destination);
        if (!fileExists) await mkdir(destination);
        cb(null, destination);
      } catch (error: any) {
        cb(error, '');
      }
    },
    filename: (req, file, cb) => cb(null, filenameGenerator(file)),
  });
