import { ManagerEntity } from 'src/manager/manager.entity';
import { UserEntity } from 'src/user/user.entity';

export function returnUser(user: UserEntity) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restUser } = user;
  return restUser;
}

export function returnManager(user: ManagerEntity) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restUser } = user;
  return restUser;
}
