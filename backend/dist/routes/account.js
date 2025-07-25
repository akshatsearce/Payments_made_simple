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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
exports.router = express_1.default.Router();
exports.router.get("/balance", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield db_1.Account.findOne({
        userId: req.userId
    });
    if (!account) {
        return res.status(400).json({
            msg: "No Account found"
        });
    }
    res.json({
        balance: account.balance
    });
}));
const transferSchema = zod_1.default.object({
    to: zod_1.default.string(),
    amount: zod_1.default.number()
});
exports.router.post("/transfer", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = transferSchema.safeParse(req.body);
    if (!success) {
        return res.status(402).json({
            msg: "Invalid input for transfer"
        });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { to, amount } = req.body;
    if (amount < 0) {
        yield session.abortTransaction();
        return res.status(400).json({
            msg: "Amount can't be negative"
        });
    }
    const account = yield db_1.Account.findOne({
        userId: req.userId
    }).session(session);
    if (!account || account.balance < amount) {
        yield session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        });
    }
    const to_account = yield db_1.Account.findOne({
        userId: to
    }).session(session);
    if (!to_account) {
        yield session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid To account"
        });
    }
    // performing transaction
    yield db_1.Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);
    yield db_1.Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);
    yield session.commitTransaction();
    res.json({
        msg: "Transaction Successful"
    });
}));
