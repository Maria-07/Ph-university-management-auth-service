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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const filterableFields_1 = require("../../../constance/filterableFields");
const paginationC_1 = require("../../../constance/paginationC");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const academicDepartment_services_1 = require("./academicDepartment.services");
// Create a Department
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AcademicDepartmentData = __rest(req.body, []);
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.createDepartment(AcademicDepartmentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result,
    });
}));
// get a single Department
const getSingleDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getSingleDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Department get successfully',
        data: result,
    });
}));
// search and filter Faculties
const getAllDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, filterableFields_1.academicDepartmentFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, paginationC_1.paginationFields);
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.getAllDepartments(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department Fetch successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// Update Faculty
const updateDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.updateDepartment(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department Updated successfully',
        data: result,
    });
}));
// Delete Department
const deleteDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicDepartment_services_1.AcademicDepartmentServices.deleteDepartment(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Department Deleted successfully',
        data: result,
    });
}));
exports.AcademicDepartmentController = {
    createAcademicDepartment,
    getSingleDepartment,
    getAllDepartments,
    updateDepartment,
    deleteDepartment,
};
