import { handler } from '@/utils/api-utils';
import { logout } from '@/services/auth-service';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/utils/session-utils';

function signout(req: NextApiRequest, res: NextApiResponse) {
  logout(req);
  res.status(204).send(undefined);
}

export default withSessionRoute(handler({ DELETE: signout }));
