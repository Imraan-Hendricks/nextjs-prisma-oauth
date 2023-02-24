import { getSession as handleGetSession } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from './session-adapter';
import { withSessionRoute } from '@/utils/session-utils';

function getSession(req: NextApiRequest, res: NextApiResponse<Session>) {
  const session = handleGetSession(req);
  res.status(200).json(session);
}

export default withSessionRoute(handler({ GET: getSession }));
