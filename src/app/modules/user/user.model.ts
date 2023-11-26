import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IFullName,
  IAddress,
  IUser,
  IProduct,
  UserModel,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<IFullName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [String],
  address: addressSchema,
  orders: {
    type: [productSchema],
    default: undefined,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.statics.isUserExists = async function (
  userId: number,
): Promise<IUser | null> {
  const result = await this.findOne(
    { userId },
    { _id: 0, password: 0, __v: 0 },
  );

  return result;
};

userSchema.statics.updateUserAndGetUpdatedData = async function (
  userId: number,
  userData: IUser,
): Promise<IUser | null> {
  
  // first hashing the password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_round),
  );

  userData.password = hashedPassword;// setting hashed password
  
  // get updated userId
  const updatedUserId = userData.userId;

  // secondly updated the user
  await this.updateOne({ userId }, userData);

  const result = await this.findOne(
    // thirdly get updated user data
    { userId: updatedUserId },
    { _id: 0, password: 0, __v: 0 },
  );

  return result;
};

userSchema.statics.addOrdersProperty = async function (
  userId: number,
): Promise<void> {
  await this.updateOne({ userId }, { orders: [] }); // add orders property with empty array
};

export const User = model<IUser, UserModel>('User', userSchema);
