import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser) => {
  const result = await User.create(userData);
  const user = result.toObject();

  // deleted password, _id and __v from response object
  delete (user as { password?: string }).password;
  delete (user as { _id?: unknown })._id;
  delete (user as { __v?: number }).__v;

  return user;
};

const getAllUsers = async () => {
  const result = await User.find(
    {},
    {
      _id: 0,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};

const getSingleUser = async (userId: number) => {
  const user = await User.isUserExists(userId);

  return user;
}

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser
};
