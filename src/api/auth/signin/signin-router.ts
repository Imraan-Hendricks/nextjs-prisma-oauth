import { authService } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { InternalServerError } from '@/utils/error-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { SigninAdapter, signinAdapter } from './signin-adapter';
import { userService } from '@/services/user-service';
import { withSessionRoute } from '@/utils/session-utils';

interface PostRequest extends NextApiRequest {
  body: SigninAdapter['post']['body'];
}

type PostResponse = NextApiResponse<SigninAdapter['post']['response']>;

async function POST(req: PostRequest, res: PostResponse) {
  const { email, password } = signinAdapter.post.validate(req.body);
  const { auth, ...user } = await userService.getAuthInfoByEmail(email);

  authService.ensureSameProvider('local', auth.provider);
  if (!auth.password)
    throw new InternalServerError('Failed to retrieve password');

  await authService.comparePassword(password, auth.password);
  await authService.login(req, user);

  res.status(200).json(user);
}

export const signinRouter = withSessionRoute(handler({ POST }));
