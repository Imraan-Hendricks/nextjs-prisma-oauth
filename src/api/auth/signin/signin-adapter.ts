import { Avatar, User } from '@prisma/client';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';

interface Post {
  body: {
    email: string;
    password: string;
  };
  response: User & { avatar: Avatar | null };
}

const post = {
  Schema: validate.object({
    email: validate.user.email,
    password: validate.misc.anyString,
  }),

  useResolver: function () {
    return validate.resolver(this.Schema);
  },

  validate: function (data: any) {
    const result = this.Schema.safeParse(data);
    if (!result.success) throw new ValidationError<Post['body']>(result.error);
    return result.data;
  },

  mutate: async function (data: Post['body']) {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    const user: Post['response'] = await res.json();
    return user;
  },
};

export interface SigninAdapter {
  post: Post;
}

export const signinAdapter = {
  post,
};
