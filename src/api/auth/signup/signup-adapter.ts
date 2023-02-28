import { Avatar, User } from '@prisma/client';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';
import { UserService } from '@/services/user-service';

interface Post {
  body: UserService['newUser'] & { confirmPassword?: string };
  response: User & { avatar: Avatar | null };
}

const post = {
  Schema: validate
    .object({
      username: validate.user.username,
      firstName: validate.user.firstName,
      lastName: validate.user.lastName,
      email: validate.user.email,
      contactNumber: validate.optional(validate.user.contactNumber),
      password: validate.auth.password,
      confirmPassword: validate.optional(validate.auth.confirmPassword),
    })
    .refine(
      (data) =>
        data.confirmPassword === undefined ||
        data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      }
    ),

  useResolver: function () {
    return validate.resolver(this.Schema);
  },

  validate: function validate(data: any) {
    const result = this.Schema.safeParse(data);
    if (!result.success) throw new ValidationError<Post['body']>(result.error);
    return result.data;
  },

  mutate: async function (data: Post['body']) {
    const res = await fetch('/api/auth/signup', {
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

export interface SignupAdapter {
  post: Post;
}

export const signupAdapter = {
  post,
};
