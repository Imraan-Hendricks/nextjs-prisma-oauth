export const regex = {
  containsOnlyNumbers: {
    exp: /^\d+$/,
    error: 'String may contain only numbers',
  },
  isStrongPassword: {
    exp: new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    ),
    error:
      'Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  },
};
