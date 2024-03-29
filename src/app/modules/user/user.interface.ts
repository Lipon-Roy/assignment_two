/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IFullName {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IProduct {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IProduct[];
}

export interface UserModel extends Model<IUser> {
  isUserExists(userId: number): Promise<IUser | null>;
  updateUserAndGetUpdatedData(
    userId: number,
    userData: IUser,
  ): Promise<IUser | null>;
  addOrdersProperty(userId: number): Promise<void>;
}
