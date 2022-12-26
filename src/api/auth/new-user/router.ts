import { getSession } from '../../../services/auth';
import { handler } from '../../../utils/api';
import { login } from '../../../services/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NotAcceptableError, UnauthorizedError } from '../../../utils/error';
import { updateNewUser as handleUpdateNewUser } from '../../../services/user';
import { withSessionRoute } from '../../../utils/session';

async function updateNewUser(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req);

  if (!session.user) throw new UnauthorizedError();
  if (!session.user.newUser)
    throw new NotAcceptableError('User is already registered!');

  const user = await handleUpdateNewUser(session.user.id);
  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(handler({ PUT: updateNewUser }));
