import { handler } from '../../../utils/api';
import { logout } from '../../../services/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../utils/session';

function signout(req: NextApiRequest, res: NextApiResponse) {
  logout(req);
  res.status(204).send(undefined);
}

export default withSessionRoute(handler({ DELETE: signout }));
