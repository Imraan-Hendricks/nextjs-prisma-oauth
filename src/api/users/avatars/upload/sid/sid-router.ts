import {
  deleteStaticAvatar,
  uploadStaticAvatar,
} from '@/services/storage-service';
import { getSession, login } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserById } from '@/services/user-service';
import { UnauthorizedError } from '@/utils/error-utils';
import { withSessionRoute } from '@/utils/session-utils';

async function uploadAvatarBySID(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const file = await uploadStaticAvatar(req, res);
  const urlPrefix = '/api/users/avatars';

  const user = await updateUserById(session.user.id, {
    avatar: `${urlPrefix}/${file.filename}`,
  });

  const previousAvatar = session.user.avatar;
  if (previousAvatar) await deleteStaticAvatar(previousAvatar);

  await login(req, user);

  res.status(200).json(user);
}

export default withSessionRoute(handler({ PUT: uploadAvatarBySID }));
