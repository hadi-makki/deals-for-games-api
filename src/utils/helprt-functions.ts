import { UserEntity } from 'src/user/user.entity';

export const returnUser = (user: UserEntity) => {
  const { password, ...restUser } = user;
  return restUser;
};
