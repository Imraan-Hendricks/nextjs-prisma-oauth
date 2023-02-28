import { getSession } from '@/services/auth-service';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionAdapter } from './session-adapter';
import { withSessionRoute } from '@/utils/session-utils';

type GetResponse = NextApiResponse<SessionAdapter['get']['response']>;

function GET(req: NextApiRequest, res: GetResponse) {
  const session = getSession(req);
  res.status(200).json(session);
}

export const sessionRouter = withSessionRoute(handler({ GET }));
