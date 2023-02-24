import {
  comparePassword,
  ensureSameProvider,
  login,
} from '@/services/auth-service';
import { GenericError } from '@/utils/error-utils';
import { getUserInclAuthByEmail } from '@/services/user-service';
import { handler } from '@/utils/api-utils';
import { localProvider } from '@/utils/constant-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { SigninData, validateSigninData } from './signin-adapter';
import { User } from '@prisma/client';
import { withSessionRoute } from '@/utils/session-utils';

interface SigninRequest extends NextApiRequest {
  body: SigninData;
}

type SigninResponse = NextApiResponse<User | GenericError>;

async function signin(req: SigninRequest, res: SigninResponse) {
  const { email, password } = validateSigninData(req.body);
  const { auth, ...user } = await getUserInclAuthByEmail(email);

  ensureSameProvider(localProvider, auth.provider);
  await comparePassword(password, auth.password as string);
  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(handler({ POST: signin }));
