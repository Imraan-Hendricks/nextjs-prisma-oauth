import {
  GenericError,
  InternalServerError,
  NoRecordError,
  NotAcceptableError,
} from '../utils/error';
import { prisma } from '../utils/db';

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
