"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const zod_1 = require("zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validatedUserData = user_validation_1.userValidationSchema.parse(userData);
        const createdUser = yield user_service_1.userServices.createUser(validatedUserData);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: createdUser,
        });
    }
    catch (err) {
        // zod error checking
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                error: err.errors,
            });
        }
        else if (err instanceof Error) {
            // common error checking
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
            });
        }
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_service_1.userServices.getSingleUser(Number(userId));
        if (!user) {
            throw 'Not Found';
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    }
    catch (err) {
        if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                }
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        }
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const validatedUserData = user_validation_1.userValidationSchema.parse(userData);
        const updatedUser = yield user_service_1.userServices.updateSingleUser(Number(userId), validatedUserData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUser,
        });
    }
    catch (err) {
        // zod error checking
        if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                error: err.errors,
            });
        }
        else if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
            });
        }
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield user_service_1.userServices.deleteSingleUser(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        }
    }
});
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const product = req.body;
        const validatedProductData = user_validation_1.productValidationSchema.parse(product); // validate the product
        yield user_service_1.userServices.addNewProduct(Number(userId), validatedProductData); // add the validated product into orders array
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else if (err instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                error: err.errors,
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield user_service_1.userServices.getAllOrders(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                orders,
            },
        });
    }
    catch (err) {
        if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else if (err === 'Orders Undefined') {
            res.status(404).json({
                success: false,
                message: 'Orders Undefined',
                error: {
                    code: 404,
                    description: 'Yet, this user does not any order',
                },
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
            });
        }
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const totalPrice = yield user_service_1.userServices.getTotalPrice(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice,
            },
        });
    }
    catch (err) {
        if (err === 'Not Found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else if (err === 'Orders Undefined') {
            res.status(404).json({
                success: false,
                message: 'Orders Undefined',
                error: {
                    code: 404,
                    description: 'Yet, this user does not any order',
                },
            });
        }
        else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err,
            });
        }
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addNewProduct,
    getAllOrders,
    getTotalPrice,
};
