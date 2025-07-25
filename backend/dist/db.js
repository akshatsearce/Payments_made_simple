"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
mongoose_1.default.connect(config_1.CONNECTION_STRING);
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Account = mongoose_1.default.model('Account', accountSchema);
