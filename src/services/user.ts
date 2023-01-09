import {
  GenericError,
  InternalServerError,
  NoRecordError,
  NotAcceptableError,
} from '../utils/error';
import { OAuthProvider } from '../utils/constant';
import { prisma } from '../utils/db';

export async function createOAuthUser(data: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string | undefined;
  provider: OAuthProvider;
  providerId: string;
}) {
  try {
    const { provider, providerId, ...rest } = data;
    const user = await prisma.user.create({
      data: { ...rest, auth: { create: { provider, providerId } } },
    });

    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function createUser(data: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string | undefined;
  password: string;
}) {
  try {
    const { password, ...rest } = data;
    const user = await prisma.user.create({
      data: { ...rest, auth: { create: { password } } },
    });

    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function deleteUserById(id: string) {
  try {
    const deleteAuth = prisma.auth.delete({ where: { userId: id } });
    const deleteUser = prisma.user.delete({ where: { id } });
    const { 1: user } = await prisma.$transaction([deleteAuth, deleteUser]);

    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function isUniqueEmail(email: string) {
  try {
    const emailExists = !!(await prisma.user.findFirst({
      where: { email },
    }));
    if (emailExists) throw new NotAcceptableError('Email already exists');
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NoRecordError('User does not exist!');
    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function getUserInclAuthByEmail(email: string) {
  try {
    const userRecord = await prisma.user.findUnique({
      where: { email },
      include: { auth: true },
    });
    if (!userRecord) throw new NoRecordError('User does not exist!');

    const { auth, ...user } = userRecord;
    if (!auth) throw new NoRecordError('Problem reading auth information');

    return { auth, ...user };
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export interface UpdateableUserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  newUser?: boolean;
}

export async function updateUserById(id: string, data: UpdateableUserData) {
  try {
    const user = await prisma.user.update({
      data,
      where: { id },
    });
    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}
