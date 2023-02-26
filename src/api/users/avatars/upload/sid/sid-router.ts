import { getSession, login } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { storageService } from '@/services/storage-service';
import { updateUserById } from '@/services/user-service';
import { UnauthorizedError } from '@/utils/error-utils';
import { withSessionRoute } from '@/utils/session-utils';

async function uploadAvatarBySID(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const file = await storageService.uploadAvatar(req, res);
  const user = await updateUserById(session.user.id, {
    avatar: file,
  });

  const previousAvatar = session.user.avatar;
  if (previousAvatar)
    await storageService.deleteFileIfExists(previousAvatar.path);

  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(handler({ PUT: uploadAvatarBySID }));
