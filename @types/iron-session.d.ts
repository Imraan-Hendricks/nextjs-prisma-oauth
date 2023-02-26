import { Session } from '@/api/auth/session/session-adapter';

declare module 'iron-session' {
  interface IronSessionData extends Session {}
}
