import fs from 'fs';
import { InternalServerError } from './error-utils';

export const deleteFile = async (path: string) => {
  try {
    await fs.promises.unlink(path);
  } catch (error) {
    throw new InternalServerError('Failed to delete file!');
  }
};

export const deleteFileIfExists = async (path: string) => {
  const fileExists = await accessFile(path);
  if (fileExists) await deleteFile(path);
};

export const accessFile = async (path: string) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

export const mkdir = async (path: string) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (error) {
    throw new InternalServerError('Failed to create directory!');
  }
};
