import multer from 'multer';
import path from 'path';
import {
  GenericError,
  InternalServerError,
  NotAcceptableError,
  ValidationError,
} from './error-utils';
import { randomUUID } from 'crypto';
import { validate } from './validation-utils';
import { z } from 'zod';

export interface FileUploadResult {
  file: Express.Multer.File | undefined;
  files:
    | Express.Multer.File[]
    | { [key: string]: Express.Multer.File[] }
    | undefined;
}

export const fileUpload =
  (upload: (req: any, res: any, cb: (error: any) => void) => void) =>
  (req: any, res: any): Promise<FileUploadResult> =>
    new Promise((resolve, reject) => {
      upload(req, res, (error: any) => {
        if (error instanceof multer.MulterError)
          return reject(new InternalServerError(error.message));
        if (error) {
          if (error instanceof GenericError) return reject(error);
          return reject(new InternalServerError(error.message));
        }
        const result: FileUploadResult = { file: req.file, files: req.files };
        resolve(result);
      });
    });

export const generateFilename = (file: Express.Multer.File) =>
  file.fieldname + '-' + randomUUID() + path.extname(file.originalname);

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

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

export interface LocalFile extends MulterFile {
  location: string;
}

export const MulterFileSchema = z.object({
  fieldname: validate.file.fieldname,
  originalname: validate.file.originalname,
  encoding: validate.file.encoding,
  mimetype: validate.file.mimetype,
  size: validate.file.size,
  destination: validate.file.destination,
  filename: validate.file.filename,
  path: validate.file.path,
});

export function validateMulterFile(file: any) {
  const result = MulterFileSchema.safeParse(file);
  if (!result.success) {
    const message = 'Error while uploading file.';
    throw new ValidationError<MulterFile>('body', result.error, message);
  }
  const multerFile: MulterFile = result.data;
  return multerFile;
}
