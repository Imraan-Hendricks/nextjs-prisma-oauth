import {
  comparePassword,
  ensureSameProvider,
  login,
} from '@/services/auth-service';
import { getUserInclAuthByEmail } from '@/services/user-service';
import { handler } from '@/utils/api-utils';
import { InternalServerError } from '@/utils/error-utils';
import { localProvider } from '@/utils/constant-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { SigninAdapter, signinAdapter } from './signin-adapter';
import { withSessionRoute } from '@/utils/session-utils';

interface PostRequest extends NextApiRequest {
  body: SigninAdapter['post']['body'];
}

type PostResponse = NextApiResponse<SigninAdapter['post']['response']>;

async function POST(req: PostRequest, res: PostResponse) {
  const { email, password } = signinAdapter.post.validate(req.body);
  const { auth, ...user } = await getUserInclAuthByEmail(email);

  ensureSameProvider(localProvider, auth.provider);
  if (!auth.password)
    throw new InternalServerError('Failed to retrieve password');

  await comparePassword(password, auth.password);
  await login(req, user);

  res.status(200).json(user);
}

export const signinRouter = withSessionRoute(handler({ POST }));
