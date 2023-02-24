import passport from 'passport';
import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_BASE_URL,
} from '@/utils/env-utils';
import { signin } from './oauth-signin';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${SERVER_BASE_URL}/api/auth/oauth/callback/facebook`,
      passReqToCallback: true,
      profileFields: ['id', 'displayName', 'name', 'photos', 'email'],
    },
    async (req, accessToken, refreshToken, profile, cb) =>
      await signin(profile, cb)
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_BASE_URL}/api/auth/oauth/callback/google`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) =>
      await signin(profile, cb)
  )
);

export { passport };
