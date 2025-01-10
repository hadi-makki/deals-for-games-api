import { UserEntity } from 'src/user/user.entity';
import dotenv from 'dotenv';

export const returnUser = (user: UserEntity) => {
  const { password, ...restUser } = user;
  return restUser;
};

export function isLocalEnv(): boolean {
  return process.env.NODE_ENV.includes('local');
}
