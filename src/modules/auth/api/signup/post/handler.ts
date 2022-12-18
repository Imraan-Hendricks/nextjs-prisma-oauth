import {
  GenericError,
  NotAcceptableError,
} from '../../../../../utils/error-utils';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../utils/db-utils';
import { SignupData } from './adapter';
import { User } from '@prisma/client';

interface SignupRequest extends NextApiRequest {
  body: SignupData;
}

type SignupResponse = NextApiResponse<User | GenericError>;

export async function signup(req: SignupRequest, res: SignupResponse) {
  // validate signup data

  const { password, confirmPassword, ...newUser } = req.body;

  const userExists = await prisma.user.findFirst({
    where: { email: newUser.email },
  });
  if (userExists) throw new NotAcceptableError('Email already exists');

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: { ...newUser, auth: { create: { password: hashedPassword } } },
  });

  req.session.user = user;
  await req.session.save();

  res.status(200).json(user);
}
