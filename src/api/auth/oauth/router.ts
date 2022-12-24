import { handler } from '../../../utils/api';
import { login } from '../../../services/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NotFoundError } from '../../../utils/error';
import { OAuthProvider } from '../../../utils/constant';
import { passport } from './passport';
import { User } from '@prisma/client';
import { withSessionRoute } from '../../../utils/session';

function oauthSignin(req: NextApiRequest, res: NextApiResponse) {
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
    async (error: any, user: User, info: any) => {
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

export default withSessionRoute(handler({ GET: oauthSignin }));
