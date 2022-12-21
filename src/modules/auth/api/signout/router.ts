import { handler } from '../../../../utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../utils/session-utils';

function signout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(204).send(undefined);
}

export default withSessionRoute(handler({ DELETE: signout }));
