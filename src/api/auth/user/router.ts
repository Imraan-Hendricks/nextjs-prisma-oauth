import {
  deleteUserById,
  UpdateableUserData,
  updateUserById,
} from '../../../services/user';
import { getSession, logout } from '../../../services/auth';
import { handler } from '../../../utils/api';
import { login } from '../../../services/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { UnauthorizedError } from '../../../utils/error';
import { validateUpdateableUserData } from './adapter';
import { withSessionRoute } from '../../../utils/session';

async function deleteAuthUser(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const user = await deleteUserById(session.user.id);
  logout(req);

  res.status(200).json(user);
}

interface UpdateRequest extends NextApiRequest {
  body: UpdateableUserData;
}

async function updateAuthUser(req: UpdateRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const data = validateUpdateableUserData(req.body);

  const user = await updateUserById(session.user.id, data);
  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(
  handler({ PUT: updateAuthUser, DELETE: deleteAuthUser })
);
