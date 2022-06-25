import { createUser } from '../utils/dao/auth';

export const newUser = (personDto) => {
  const { username, email, password } = personDto;
  return createUser(username, email, password);
};
