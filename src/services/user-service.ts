import {
  DatabaseError,
  GenericError,
  NoRecordError,
  NotAcceptableError,
} from '@/utils/error-utils';
import { LocalFile } from '@/utils/storage-utils';
import { OAuthProvider } from '@/utils/validation-utils';
import { prisma } from '@/utils/db-utils';

interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string | undefined;
  password: string;
}

async function create(data: NewUser) {
  try {
    const { password, ...rest } = data;
    const user = await prisma.user.create({
      data: { ...rest, auth: { create: { password } } },
      include: { avatar: true },
    });

    return user;
  } catch (error: any) {
    throw new DatabaseError('Failed to create user');
  }
}

interface NewOauthUser extends Omit<NewUser, 'password'> {
  provider: OAuthProvider;
  providerId: string;
}

async function createOAuth(data: NewOauthUser) {
  try {
    const { provider, providerId, ...rest } = data;
    const user = await prisma.user.create({
      data: { ...rest, auth: { create: { id: providerId, provider } } },
      include: { avatar: true },
    });

    return user;
  } catch (error: any) {
    throw new DatabaseError('Failed to create user');
  }
}

async function deleteById(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
      include: { avatar: true },
    });
    return user;
  } catch (error: any) {
    throw new DatabaseError('Failed to delete user');
  }
}

async function isUniqueEmail(email: string) {
  try {
    const emailExists = !!(await prisma.user.findFirst({
      where: { email },
    }));
    if (emailExists) throw new NotAcceptableError('Email already exists');
  } catch (error: any) {
    if (error instanceof GenericError) throw error;
    throw new DatabaseError('Failed to find user');
  }
}

async function getAvatarByFilename(filename: string) {
  try {
    const avatar = await prisma.avatar.findUnique({ where: { filename } });
    if (!avatar) throw new NoRecordError('Avatar does not exist!');
    return avatar;
  } catch (error: any) {
    if (error instanceof GenericError) throw error;
    throw new DatabaseError('Failed to find avatar');
  }
}

async function getByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { avatar: true },
    });
    if (!user) throw new NoRecordError('User does not exist!');
    return user;
  } catch (error: any) {
    if (error instanceof GenericError) throw error;
    throw new DatabaseError('Failed to find user');
  }
}

async function getAuthInfoByEmail(email: string) {
  try {
    const userRecord = await prisma.user.findUnique({
      where: { email },
      include: { auth: true, avatar: true },
    });
    if (!userRecord) throw new NoRecordError('User does not exist!');

    const { auth, ...user } = userRecord;
    if (!auth) throw new NoRecordError('Problem reading auth information');

    return { auth, ...user };
  } catch (error: any) {
    if (error instanceof GenericError) throw error;
    throw new DatabaseError('Failed to find user');
  }
}

interface UpdateableUserData {
  avatar?: LocalFile;
  username?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  newUser?: boolean;
}

async function updateById(id: string, data: UpdateableUserData) {
  const { avatar, ...userData } = data;

  try {
    const user = await prisma.user.update({
      data: {
        ...userData,
        ...(avatar && {
          avatar: {
            upsert: {
              create: { ...avatar },
              update: { ...avatar },
            },
          },
        }),
      },
      where: { id },
      include: {
        avatar: true,
      },
    });

    return user;
  } catch (error: any) {
    throw new DatabaseError('Failed to update user');
  }
}

export interface UserService {
  newUser: NewUser;
  NewOauthUser: NewOauthUser;
  updateableData: UpdateableUserData;
}

export const userService = {
  createOAuth,
  create,
  deleteById,
  isUniqueEmail,
  getAvatarByFilename,
  getByEmail,
  getAuthInfoByEmail,
  updateById,
};
