import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser) => {
  const result = await User.create(userData);
  const user = result.toObject();
  delete (user as { password?: string }).password;
  return user;
};

export const userServices = {
  createUser,
};
