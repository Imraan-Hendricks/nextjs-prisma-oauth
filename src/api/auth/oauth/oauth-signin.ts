import { Auth, User } from '@prisma/client';
import {
  createOAuthUser,
  getUserInclAuthByEmail,
} from '@/services/user-service';
import { ensureSameProvider, processProfile } from '@/services/auth-service';
import {
  GenericError,
  InternalServerError,
  NoRecordError,
} from '@/utils/error-utils';
import { handlePromise } from '@/utils/common-utils';
import { Profile } from 'passport';

export const signin = async (
  profile: Profile,
  cb: (error: any, user?: User, info?: any) => void
) => {
  try {
    const userProfile = processProfile(profile);

    const [error, userRecord] = await handlePromise<User & { auth: Auth }>(
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
