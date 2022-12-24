import nodemailer from 'nodemailer';
import { InternalServerError } from './error';
import {
  NODEMAILER_HOST,
  NODEMAILER_SECURE,
  NODEMAILER_PORT,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
} from './env';

export const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: NODEMAILER_SECURE,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

interface MailOptions {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export const sendMail = async (mailOptions: MailOptions) => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new InternalServerError('Failed to send mail');
  }
};
