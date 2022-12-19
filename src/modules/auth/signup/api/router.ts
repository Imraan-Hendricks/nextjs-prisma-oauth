import {
  GenericError,
  NotAcceptableError,
} from '../../../../utils/error-utils';
import { hash } from 'bcryptjs';
import { handler } from '../../../../utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/db-utils';
import { SignupData } from './adapter';
import { User } from '@prisma/client';
import { withSessionRoute } from '../../../../utils/session-utils';

interface SignupRequest extends NextApiRequest {
  body: SignupData;
}

type SignupResponse = NextApiResponse<User | GenericError>;

async function signup(req: SignupRequest, res: SignupResponse) {
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

export default withSessionRoute(handler({ POST: signup }));
