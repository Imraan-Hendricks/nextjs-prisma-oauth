import passport, { Profile } from 'passport';
import { Avatar, User } from '@prisma/client';
import {
  createOAuthUser,
  getUserInclAuthByEmail,
} from '@/services/user-service';
import { ensureSameProvider, processProfile } from '@/services/auth-service';
import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_BASE_URL,
} from '@/utils/env-utils';
import {
  GenericError,
  InternalServerError,
  NoRecordError,
} from '@/utils/error-utils';
import { handlePromise } from '@/utils/common-utils';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

type Signin = (
  profile: Profile,
  cb: (error: any, user?: User & { avatar: Avatar | null }, info?: any) => void
) => Promise<void>;

const signin: Signin = async function (profile, cb) {
  try {
    const userProfile = processProfile(profile);

    const [error, userRecord] = await handlePromise(
      getUserInclAuthByEmail(userProfile.email)
    );

    if (error) {
      if (!(error instanceof NoRecordError)) throw error;
      const user = await createOAuthUser(userProfile);

      return cb(null, user);
    }

    const { auth, ...user } = userRecord;
    ensureSameProvider(userProfile.provider, auth.provider);

    cb(null, user);
  } catch (error: unknown) {
    if (error instanceof GenericError) return cb(error);
    cb(new InternalServerError('Failed to signin user'));
  }
};

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
