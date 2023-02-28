import { authService } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignupAdapter, signupAdapter } from './signup-adapter';
import { userService } from '@/services/user-service';
import { withSessionRoute } from '@/utils/session-utils';

interface PostRequest extends NextApiRequest {
  body: SignupAdapter['post']['body'];
}

type PostResponse = NextApiResponse<SignupAdapter['post']['response']>;

async function POST(req: PostRequest, res: PostResponse) {
  const { password, confirmPassword, ...newUser } = signupAdapter.post.validate(
    req.body
  );

  await userService.isUniqueEmail(newUser.email);
  const hashedPassword = await authService.hashPassword(password);
  const user = await userService.create({
    ...newUser,
    password: hashedPassword,
  });

  await authService.login(req, user);
  res.status(200).json(user);
}

export const signupRouter = withSessionRoute(handler({ POST }));
