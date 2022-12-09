export const NODE_ENV = process.env.NODE_ENV as string;

export const APP_EMAIL = process.env.APP_EMAIL as string;
export const ENQUIRY_EMAIL = process.env.ENQUIRY_EMAIL as string;

export const NODEMAILER_HOST = process.env.NODEMAILER_HOST as string;
export const NODEMAILER_SECURE = Boolean(process.env.NODEMAILER_SECURE as string);
export const NODEMAILER_PORT = parseInt(process.env.NODEMAILER_PORT as string, 10);
export const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL as string;
export const UPLOADS_DIRECTORY = process.env.UPLOADS_DIRECTORY as string;

export const DB_NAME = process.env.DB_NAME as string;
export const MONGO_URI = process.env.MONGO_URI as string;

export const COOKIE_NAME = process.env.COOKIE_NAME as string;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID as string;
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET as string;
