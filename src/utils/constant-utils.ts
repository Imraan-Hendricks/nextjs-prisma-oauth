export type LocalProvider = 'local';
export const localProvider = 'local';

export type OAuthProvider = 'facebook' | 'google';
export const oauthProviders = ['facebook', 'google'] as const;

export type Provider = OAuthProvider | LocalProvider;
export const providers = [...oauthProviders, localProvider] as const;

export type Role =
  | 'administrator'
  | 'author'
  | 'contributor'
  | 'editor'
  | 'subscriber'
  | 'superAdmin';

export const roles = [
  'administrator',
  'author',
  'contributor',
  'editor',
  'subscriber',
  'superAdmin',
] as const;
