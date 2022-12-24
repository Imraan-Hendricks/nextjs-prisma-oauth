import { COOKIE_NAME, SESSION_SECRET } from './env';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const sessionOptions = {
  cookieName: COOKIE_NAME,
  password: SESSION_SECRET,
  cookieOptions: {
    domain: undefined,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
} as const;

export function withSessionRoute(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
