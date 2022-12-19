import { handler } from '../../../../utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from './adapter';
import { withSessionRoute } from '../../../../utils/session-utils';

const getSession = (req: NextApiRequest, res: NextApiResponse<Session>) => {
  const session = { user: req.session.user };
  res.status(200).json(session);
};

export default withSessionRoute(handler({ GET: getSession }));
