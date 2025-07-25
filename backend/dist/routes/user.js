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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const config_1 = require("../config");
const db_1 = require("../db");
exports.router = express_1.default.Router();
const signupSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string()
});
const signinSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string()
});
const updateSchema = zod_1.default.object({
    password: zod_1.default.string().optional(),
    firstname: zod_1.default.string().optional(),
    lastname: zod_1.default.string().optional()
});
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    const user = yield db_1.User.findOne({
        username: body.username
    });
    if (user) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    const dbUser = yield db_1.User.create(body);
    const useId = dbUser._id;
    yield db_1.Account.create({
        userId: useId,
        balance: 1 + Math.random() * 10000
    });
    const token = jsonwebtoken_1.default.sign({
        userId: dbUser._id
    }, config_1.JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    });
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email not found / Incorrect inputs"
        });
    }
    const user = yield db_1.User.findOne({
        username: body.username,
        password: body.password
    });
    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user._id
    }, config_1.JWT_SECRET);
    res.json({
        token: token
    });
}));
exports.router.put("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(403).json({
            message: "Invalid Inputs"
        });
    }
    yield db_1.User.updateOne({
        _id: req.userId
    }, req.body);
    res.json({
        msg: "Update Successful"
    });
}));
exports.router.get("/bulk", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const filtered_users = yield db_1.User.find({
        $or: [{
                firstname: {
                    "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }]
    });
    res.json({
        user: filtered_users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
}));
