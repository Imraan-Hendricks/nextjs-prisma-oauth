import {
  deleteUserById,
  UpdateableUserData,
  updateUserById,
} from '@/services/user-service';
import { deleteStaticAvatar } from '@/services/storage-service';
import { getSession, login, logout } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { UnauthorizedError } from '@/utils/error-utils';
import { validateUpdateableUserData } from './sid-adapter';
import { withSessionRoute } from '@/utils/session-utils';

async function deleteUserBySID(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const user = await deleteUserById(session.user.id);
  if (session.user.avatar) await deleteStaticAvatar(session.user.avatar);

  logout(req);

  res.status(200).json(user);
}

interface UpdateRequest extends NextApiRequest {
  body: UpdateableUserData;
}

async function updateUserBySID(req: UpdateRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const data = validateUpdateableUserData(req.body);

  const user = await updateUserById(session.user.id, data);
  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(
  handler({ PUT: updateUserBySID, DELETE: deleteUserBySID })
);
