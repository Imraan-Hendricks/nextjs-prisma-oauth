import { authService } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { storageService } from '@/services/storage-service';
import { UnauthorizedError } from '@/utils/error-utils';
import { userService } from '@/services/user-service';
import { withSessionRoute } from '@/utils/session-utils';
import { UploadAvatarBySidAdapter } from './sid-adapter';

type PutReponse = NextApiResponse<UploadAvatarBySidAdapter['put']['response']>;

async function PUT(req: NextApiRequest, res: PutReponse) {
  const session = authService.getSession(req);
  if (!session.user) throw new UnauthorizedError();

  const file = await storageService.uploadAvatar(req, res);
  const user = await userService.updateById(session.user.id, {
    avatar: file,
  });

  const previousAvatar = session.user.avatar;
  if (previousAvatar)
    await storageService.deleteFileIfExists(previousAvatar.path);

  await authService.login(req, user);

  res.status(200).json(user);
}

export const uploadAvatarBySidRouter = withSessionRoute(handler({ PUT }));
