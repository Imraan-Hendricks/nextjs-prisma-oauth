import { createUser, isUniqueEmail } from '@/services/user-service';
import { handler } from '@/utils/api-utils';
import { hashPassword, login } from '@/services/auth-service';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignupAdapter, signupAdapter } from './signup-adapter';
import { withSessionRoute } from '@/utils/session-utils';

interface PostRequest extends NextApiRequest {
  body: SignupAdapter['post']['body'];
}

type PostResponse = NextApiResponse<SignupAdapter['post']['response']>;

async function POST(req: PostRequest, res: PostResponse) {
  const { password, confirmPassword, ...newUser } = signupAdapter.post.validate(
    req.body
  );

  await isUniqueEmail(newUser.email);
  const hashedPassword = await hashPassword(password);
  const user = await createUser({ ...newUser, password: hashedPassword });

  await login(req, user);
  res.status(200).json(user);
}

export const signupRouter = withSessionRoute(handler({ POST }));
