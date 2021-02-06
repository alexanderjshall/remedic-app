export const validateSignupForm = (
  email: string | undefined,
  password: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  postCode: string | undefined,
  language: string | undefined
): boolean => {
  return (
    !email || !password || !firstName || !lastName || !postCode || !language
  );
};

export const validateLoginForm = (email: string, password: string): boolean => {
  return !email || !password;
};
