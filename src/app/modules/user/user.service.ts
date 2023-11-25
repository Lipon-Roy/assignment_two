import { IProduct, IUser } from './user.interface';
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
};

const updateSingleUser = async (userId: number, userData: IUser) => {
  if (!(await User.isUserExists(userId))) {
    // firstly checking user exists or not
    return Promise.reject('Not Found');
  }

  // secondly update user and get updated user data
  const updatedUser = await User.updateUserAndGetUpdatedData(userId, userData);

  return updatedUser;
};

const deleteSingleUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    return Promise.reject('Not Found');
  }
  await User.deleteOne({ userId });
};

const addNewProduct = async (userId: number, product: IProduct) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    return Promise.reject('Not Found');
  }

  if (!user.orders) {
    await User.addOrdersProperty(userId);
  }

  await User.updateOne(
    {
      userId,
    },
    {
      $push: {
        orders: product,
      },
    },
  );
};

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewProduct,
};
