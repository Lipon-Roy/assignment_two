import { z } from 'zod';

// Full name validation schema
const fullNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
}).strict();

// Address validation schema
const addressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
}).strict();

// Order validation schema
export const productValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
}).strict();

// User validation schema
export const userValidationSchema = z.object({
  userId: z.number({ required_error: 'Invalid user id' }),
  username: z.string({ required_error: 'Invalid username' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: fullNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }).email({message: 'Invalid email'}),
  isActive: z.boolean({ required_error: 'Is active is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobby is required' })),
  address: addressValidationSchema,
  orders: z.array(productValidationSchema).optional(),
}).strict();
