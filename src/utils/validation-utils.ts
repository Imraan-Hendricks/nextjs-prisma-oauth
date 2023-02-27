import { providers, roles } from './constant-utils';
import { regex } from './regex-utils';
import { z, ZodEffects, ZodString } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const user = {
  id: z.string(),
  avatar: z.string().min(4).max(2000),
  username: z.string().min(2).max(100),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  contactNumber: z
    .string()
    .length(10)
    .refine(
      (val) => regex.containsOnlyNumbers.exp.test(val),
      regex.containsOnlyNumbers.error
    ),
  role: z.enum(roles),
  newUser: z.boolean(),
  createAt: z.date(),
  updatedAt: z.date(),
};

const auth = {
  userId: z.string(),
  providerId: z.string(),
  provider: z.enum(providers),
  password: z
    .string()
    .min(8)
    .refine(
      (val) => regex.isStrongPassword.exp.test(val),
      regex.isStrongPassword.error
    ),
  confirmPassword: z.string().min(8),
  updatedAt: z.date(),
};

const file = {
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  location: z.string(),
};

const misc = {
  anyString: z.string(),
};

const optional = (validation: ZodString | ZodEffects<ZodString>) => {
  return z
    .union([validation, z.string().length(0)])
    .optional()
    .transform((e) => (e === '' ? undefined : e));
};

export const validate = {
  auth,
  file,
  misc,
  object: z.object,
  optional,
  resolver: zodResolver,
  user,
};
