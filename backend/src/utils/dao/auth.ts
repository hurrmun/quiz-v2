import database from '../../database/database';

export const createUser = async (username, email, password) => {
  const [user_id] = await database('user')
    .insert({
      username,
      email,
      password,
    })
    .returning('user_id');

  return user_id;
};
