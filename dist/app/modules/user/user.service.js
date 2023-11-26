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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    const user = result.toObject();
    // deleted password, _id and __v from response object
    delete user.password;
    delete user._id;
    delete user.__v;
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userId);
    return user;
});
const updateSingleUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        // firstly checking user exists or not
        return Promise.reject('Not Found');
    }
    // secondly update user and get updated user data
    const updatedUser = yield user_model_1.User.updateUserAndGetUpdatedData(userId, userData);
    return updatedUser;
});
const deleteSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        return Promise.reject('Not Found');
    }
    yield user_model_1.User.deleteOne({ userId });
});
const addNewProduct = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userId);
    if (!user) {
        return Promise.reject('Not Found');
    }
    if (!user.orders) {
        yield user_model_1.User.addOrdersProperty(userId); // adding the orders property
    }
    yield user_model_1.User.updateOne({
        userId,
    }, {
        $push: {
            orders: product,
        },
    });
});
const getAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userId);
    if (!user) {
        return Promise.reject('Not Found');
    }
    if (!user.orders)
        return Promise.reject('Orders Undefined');
    return user.orders;
});
const getTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(userId);
    if (!user) {
        return Promise.reject('Not Found');
    }
    if (!user.orders)
        return Promise.reject('Orders Undefined');
    let totalPrice = 0;
    for (const product of user.orders) {
        const { price, quantity } = product;
        totalPrice += (price * quantity);
    }
    return Number(totalPrice.toFixed(2));
});
exports.userServices = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addNewProduct,
    getAllOrders,
    getTotalPrice
};
