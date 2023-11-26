"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // request body parser
app.use((0, cors_1.default)());
// application routes
app.get('/', (req, res) => {
    res.send("Hello Assignment Two");
});
app.use('/api/users', user_route_1.userRouter);
// notFound handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Not found',
        error: {
            code: 404,
            description: 'Your requested content was not found',
        },
    });
});
// error handler
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
    else {
        next(err);
    }
});
exports.default = app;