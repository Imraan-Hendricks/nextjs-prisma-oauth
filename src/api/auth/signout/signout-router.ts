import { authService } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/utils/session-utils';
import { SignoutAdapter } from './signout-adapter';

type DeleteResponse = NextApiResponse<SignoutAdapter['delete']['response']>;

function DELETE(req: NextApiRequest, res: DeleteResponse) {
  authService.logout(req);
  res.status(204).send(undefined);
}

export const signoutRouter = withSessionRoute(handler({ DELETE }));
