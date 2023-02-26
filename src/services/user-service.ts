import {
  GenericError,
  InternalServerError,
  NoRecordError,
  NotAcceptableError,
} from '@/utils/error-utils';
import { LocalFile } from '@/utils/storage-utils';
import { OAuthProvider } from '@/utils/constant-utils';
import { prisma } from '@/utils/db-utils';

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
      include: { avatar: true },
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
      include: { avatar: true },
    });

    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function deleteUserById(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
      include: { avatar: true },
    });
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

export async function getAvatarByFilename(filename: string) {
  try {
    const avatar = await prisma.avatar.findUnique({ where: { filename } });
    if (!avatar) throw new NoRecordError('Avatar does not exist!');
    return avatar;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { avatar: true },
    });
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
      include: { auth: true, avatar: true },
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
  avatar?: LocalFile;
  username?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  newUser?: boolean;
}

export async function updateUserById(id: string, data: UpdateableUserData) {
  const { avatar, ...userData } = data;

  const avatarData = avatar
    ? {
        avatar: {
          upsert: {
            create: { ...avatar },
            update: { ...avatar },
          },
        },
      }
    : {};

  try {
    const user = await prisma.user.update({
      data: {
        ...userData,
        ...avatarData,
      },
      where: { id },
      include: {
        avatar: true,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof GenericError) throw error;
    throw new InternalServerError();
  }
}
