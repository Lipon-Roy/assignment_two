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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const addressSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
});
const productSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
});
const userSchema = new mongoose_1.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.findOne({ userId }, { _id: 0, password: 0, __v: 0 });
        return result;
    });
};
userSchema.statics.updateUserAndGetUpdatedData = function (userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        // first hashing the password
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_round));
        userData.password = hashedPassword; // setting hashed password
        // get updated userId
        const updatedUserId = userData.userId;
        // secondly updated the user
        yield this.updateOne({ userId }, userData);
        const result = yield this.findOne(
        // thirdly get updated user data
        { userId: updatedUserId }, { _id: 0, password: 0, __v: 0 });
        return result;
    });
};
userSchema.statics.addOrdersProperty = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.updateOne({ userId }, { orders: [] }); // add orders property with empty array
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
