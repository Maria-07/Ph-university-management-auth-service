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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../users/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // match password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatch(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    // create accessToken and refreshToken
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        userId,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expire_in);
    // console.log({ accessToken, refreshToken, needsPasswordChange });
    return { accessToken, refreshToken, needsPasswordChange };
});
// refreshToken  ---------------------------------------------------------------
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return { accessToken: newAccessToken };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // checking is user exited
    const isUserExist = yield user_model_1.User.isUserExist(user === null || user === void 0 ? void 0 : user.userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatch(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    // hash password before saving
    const newHashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    // update password
    const query = { id: user === null || user === void 0 ? void 0 : user.userId };
    const updatedData = {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    };
    yield user_model_1.User.findOneAndUpdate(query, updatedData, {
        new: true,
    });
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
