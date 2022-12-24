import { getSession as handleGetSession } from '../../../services/auth';
import { handler } from '../../../utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from './adapter';
import { withSessionRoute } from '../../../utils/session';

function getSession(req: NextApiRequest, res: NextApiResponse<Session>) {
  const session = handleGetSession(req);
  res.status(200).json(session);
}

export default withSessionRoute(handler({ GET: getSession }));
