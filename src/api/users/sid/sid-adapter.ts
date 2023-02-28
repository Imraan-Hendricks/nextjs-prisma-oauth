import { Avatar, User } from '@prisma/client';
import { UserService } from '@/services/user-service';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';

interface Delete {
  response: User & { avatar: Avatar | null };
}

const _delete = {
  mutate: async function () {
    const res = await fetch('/api/users/sid', {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw await res.json();
    const user: Delete['response'] = await res.json();
    return user;
  },
};

interface Put {
  body: UserService['updateableData'];
  response: User & { avatar: Avatar | null };
}

const put = {
  Schema: validate.object({
    username: validate.optional(validate.user.username),
    firstName: validate.optional(validate.user.firstName),
    lastName: validate.optional(validate.user.lastName),
    contactNumber: validate.optional(validate.user.contactNumber),
    newUser: validate.user.newUser.optional(),
  }),

  useResolver: function () {
    return validate.resolver(this.Schema);
  },

  validate: function (data: any) {
    const result = this.Schema.safeParse(data);
    if (!result.success) throw new ValidationError<Put['body']>(result.error);
    return result.data;
  },

  mutate: async function (data: Put['body']) {
    const res = await fetch('/api/users/sid', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw await res.json();
    const user: Put['response'] = await res.json();
    return user;
  },
};

export interface UserBySidAdapter {
  delete: Delete;
  put: Put;
}

export const userBySidAdapter = {
  delete: _delete,
  put,
};
