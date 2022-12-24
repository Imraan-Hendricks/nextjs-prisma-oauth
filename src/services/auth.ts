import { compare, hash } from 'bcryptjs';
import {
  ForbiddenError,
  GenericError,
  InternalServerError,
  NotAcceptableError,
} from '../utils/error';
import { NextApiRequest } from 'next';
import { OAuthProvider, Provider } from '../utils/constant';
import { Profile } from 'passport';
import { User } from '@prisma/client';

export async function comparePassword(password: string, hash: string) {
  try {
    if (!(await compare(password, hash)))
      throw new ForbiddenError('Incorrect password');
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export function ensureSameProvider(provider: Provider, userProvider: string) {
  if (provider === userProvider) return;
  throw new NotAcceptableError(
    'To confirm your identity, sign in with the same account you used originally.'
  );
}

export function getSession(req: NextApiRequest) {
  return { user: req.session.user };
}

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new InternalServerError();
  }
}

export async function login(req: NextApiRequest, user: User) {
  try {
    req.session.user = user;
    await req.session.save();
  } catch (error) {
    throw new InternalServerError();
  }
}

export function logout(req: NextApiRequest) {
  req.session.destroy();
}

export const processProfile = (profile: Profile) => {
  if (
    !profile.displayName ||
    !profile.name?.givenName ||
    !profile.name?.familyName ||
    !profile.emails ||
    !profile.emails[0].value ||
    !profile.provider ||
    !profile.id
  )
    throw new InternalServerError('Failed to process profile');

  return {
    username: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
    provider: profile.provider as OAuthProvider,
    providerId: profile.id,
  };
};
