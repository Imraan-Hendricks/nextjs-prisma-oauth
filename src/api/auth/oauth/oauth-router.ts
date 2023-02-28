import { Avatar, User } from '@prisma/client';
import { handler } from '@/utils/api-utils';
import { login } from '@/services/auth-service';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { NotFoundError } from '@/utils/error-utils';
import { OAuthProvider } from '@/utils/constant-utils';
import { passport } from './oauth-passport';
import { withSessionRoute } from '@/utils/session-utils';

function facebook(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('facebook', {
    scope: ['email'],
    state: JSON.stringify(req.query),
  })(req, res);
}

function google(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: JSON.stringify(req.query),
  })(req, res);
}

function callback(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate(
    req.query.provider as OAuthProvider,
    async (error: any, user: User & { avatar: Avatar | null }, info: any) => {
      if (error)
        return res
          .status(307)
          .redirect(`/auth/signin?oauthError=${error.message}`);

      await login(req, user);

      if (user.newUser) return res.status(307).redirect('/auth/new-user');
      res.status(307).redirect('/account/profile');
    }
  )(req, res);
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!Array.isArray(slug) || slug.length < 1 || slug.length > 2)
    throw new NotFoundError();

  if (slug[0] === 'callback') {
    req.query.provider = slug[1];
    return callback(req, res);
  }

  const provider = slug[0];
  if (provider === 'facebook') return facebook(req, res);
  if (provider === 'google') return google(req, res);

  throw new NotFoundError();
}

export const oauthRouter = withSessionRoute(handler({ GET }));
