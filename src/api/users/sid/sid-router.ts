import { deleteUserById, updateUserById } from '@/services/user-service';
import { getSession, login, logout } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { storageService } from '@/services/storage-service';
import { UnauthorizedError } from '@/utils/error-utils';
import { UserBySidAdapter, userBySidAdapter } from './sid-adapter';
import { withSessionRoute } from '@/utils/session-utils';

type DeleteResponse = NextApiResponse<UserBySidAdapter['delete']['response']>;

async function DELETE(req: NextApiRequest, res: DeleteResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const user = await deleteUserById(session.user.id);
  if (session.user.avatar)
    await storageService.deleteFileIfExists(session.user.avatar.path);

  logout(req);

  res.status(200).json(user);
}

interface PutRequest extends NextApiRequest {
  body: UserBySidAdapter['put']['body'];
}

type PutResponse = NextApiResponse<UserBySidAdapter['put']['response']>;

async function PUT(req: PutRequest, res: PutResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const data = userBySidAdapter.put.validate(req.body);
  const user = await updateUserById(session.user.id, data);

  await login(req, user);

  res.status(200).json(user);
}

export const userBySidRouter = withSessionRoute(handler({ PUT, DELETE }));
