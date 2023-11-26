import { z } from 'zod';

// Full name validation schema
const fullNameValidationSchema = z
  .object({
    firstName: z
      .string({ required_error: 'First name is required' })
      .max(20, { message: 'First name allow maximum 20 character' })
      .min(1, { message: 'First name contain minimum 1 character' }),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .max(20, { message: 'Last name allow maximum 20 character' })
      .min(1, { message: 'Last name contain minimum 1 character' }),
  })
  .strict();

// Address validation schema
const addressValidationSchema = z
  .object({
    street: z
      .string({ required_error: 'Street is required' })
      .max(20, { message: 'Street allow maximum 20 character' })
      .min(1, { message: 'Street contain minimum 1 character' }),
    city: z
      .string({ required_error: 'City is required' })
      .max(20, { message: 'City allow maximum 20 character' })
      .min(1, { message: 'City contain minimum 1 character' }),
    country: z
      .string({ required_error: 'Country is required' })
      .max(20, { message: 'Country allow maximum 20 character' })
      .min(1, { message: 'Country contain minimum 1 character' }),
  })
  .strict();

// Order validation schema
export const productValidationSchema = z
  .object({
    productName: z
      .string({ required_error: 'Product name is required' })
      .max(20, { message: 'Product name allow maximum 20 character' })
      .min(1, { message: 'Product name contain minimum 1 character' }),
    price: z.number({ required_error: 'Price is required and must be number' }),
    quantity: z.number({
      required_error: 'Quantity is required and must be number',
    }),
  })
  .strict();

// User validation schema
export const userValidationSchema = z
  .object({
    userId: z.number({ required_error: 'Invalid user id' }),
    username: z.string({ required_error: 'Invalid username' }),
    password: z.string({ required_error: 'Password is required' }),
    fullName: fullNameValidationSchema,
    age: z.number({ required_error: 'Age is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    isActive: z.boolean({ required_error: 'Is active is required' }),
    hobbies: z.array(z.string({ required_error: 'Hobby is required' })),
    address: addressValidationSchema,
    orders: z.array(productValidationSchema).optional(),
  })
  .strict();
