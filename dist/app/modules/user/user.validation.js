"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Full name validation schema
const fullNameValidationSchema = zod_1.z
    .object({
    firstName: zod_1.z
        .string({ required_error: 'First name is required' })
        .max(20, { message: 'First name allow maximum 20 character' })
        .min(1, { message: 'First name contain minimum 1 character' }),
    lastName: zod_1.z
        .string({ required_error: 'Last name is required' })
        .max(20, { message: 'Last name allow maximum 20 character' })
        .min(1, { message: 'Last name contain minimum 1 character' }),
})
    .strict();
// Address validation schema
const addressValidationSchema = zod_1.z
    .object({
    street: zod_1.z
        .string({ required_error: 'Street is required' })
        .max(20, { message: 'Street allow maximum 20 character' })
        .min(1, { message: 'Street contain minimum 1 character' }),
    city: zod_1.z
        .string({ required_error: 'City is required' })
        .max(20, { message: 'City allow maximum 20 character' })
        .min(1, { message: 'City contain minimum 1 character' }),
    country: zod_1.z
        .string({ required_error: 'Country is required' })
        .max(20, { message: 'Country allow maximum 20 character' })
        .min(1, { message: 'Country contain minimum 1 character' }),
})
    .strict();
// Order validation schema
exports.productValidationSchema = zod_1.z
    .object({
    productName: zod_1.z
        .string({ required_error: 'Product name is required' })
        .max(20, { message: 'Product name allow maximum 20 character' })
        .min(1, { message: 'Product name contain minimum 1 character' }),
    price: zod_1.z.number({ required_error: 'Price is required and must be number' }),
    quantity: zod_1.z.number({
        required_error: 'Quantity is required and must be number',
    }),
})
    .strict();
// User validation schema
exports.userValidationSchema = zod_1.z
    .object({
    userId: zod_1.z.number({ required_error: 'Invalid user id' }),
    username: zod_1.z.string({ required_error: 'Invalid username' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number({ required_error: 'Age is required' }),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email' }),
    isActive: zod_1.z.boolean({ required_error: 'Is active is required' }),
    hobbies: zod_1.z.array(zod_1.z.string({ required_error: 'Hobby is required' })),
    address: addressValidationSchema,
    orders: zod_1.z.array(exports.productValidationSchema).optional(),
})
    .strict();
