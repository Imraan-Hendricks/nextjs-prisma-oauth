import { createUser, isUniqueEmail } from '@/services/user-service';
import { GenericError } from '@/utils/error-utils';
import { handler } from '@/utils/api-utils';
import { hashPassword, login } from '@/services/auth-service';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignupData, validateSignupData } from './signup-adapter';
import { User } from '@prisma/client';
import { withSessionRoute } from '@/utils/session-utils';

interface SignupRequest extends NextApiRequest {
  body: SignupData;
}

type SignupResponse = NextApiResponse<User | GenericError>;

async function signup(req: SignupRequest, res: SignupResponse) {
  const { password, confirmPassword, ...newUser } = validateSignupData(
    req.body
  );

  await isUniqueEmail(newUser.email);
  const hashedPassword = await hashPassword(password);
  const user = await createUser({ ...newUser, password: hashedPassword });

  await login(req, user);
  res.status(200).json(user);
}

export default withSessionRoute(handler({ POST: signup }));
