import {
  deleteStaticAvatar,
  uploadStaticAvatar,
} from '../../../../../services/storage';
import { getSession } from '../../../../../services/auth';
import { handler } from '../../../../../utils/api';
import { login } from '../../../../../services/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserById } from '../../../../../services/user';
import { UnauthorizedError } from '../../../../../utils/error';
import { withSessionRoute } from '../../../../../utils/session';

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
