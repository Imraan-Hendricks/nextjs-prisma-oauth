import { compare } from 'bcryptjs';
import {
  ForbiddenError,
  GenericError,
  NoRecordError,
  NotAcceptableError,
  ValidationError,
} from '../../../../utils/error-utils';
import { handler } from '../../../../utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/db-utils';
import { SigninData, SigninSchema } from './adapter';
import { User } from '@prisma/client';
import { withSessionRoute } from '../../../../utils/session-utils';

interface SigninRequest extends NextApiRequest {
  body: SigninData;
}

type SigninResponse = NextApiResponse<User | GenericError>;

async function signin(req: SigninRequest, res: SigninResponse) {
  const result = SigninSchema.safeParse(req.body);
  if (!result.success)
    throw new ValidationError<SigninData>('body', result.error);

  const { email, password } = result.data;

  const userRecord = await prisma.user.findUnique({
    where: { email },
    include: { auth: true },
  });
  if (!userRecord) throw new NoRecordError('User does not exist!');

  const { auth, ...user } = userRecord;
  if (!auth) throw new NoRecordError('Problem reading auth information');

  if (auth.provider !== 'local')
    throw new NotAcceptableError(
      'To confirm your identity, sign in with the same account you used originally.'
    );

  if (!(await compare(password, auth.password as string)))
    throw new ForbiddenError('Incorrect password');

  req.session.user = user;
  await req.session.save();

  res.status(200).json(user);
}

export default withSessionRoute(handler({ POST: signin }));
