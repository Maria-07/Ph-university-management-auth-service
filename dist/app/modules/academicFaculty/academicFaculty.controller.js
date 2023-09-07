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
exports.AcademicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const filterableFields_1 = require("../../../constance/filterableFields");
const paginationC_1 = require("../../../constance/paginationC");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const academicFaculty_service_1 = require("./academicFaculty.service");
// Create a Faculty
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AcademicFacultyData = __rest(req.body, []);
    const result = yield academicFaculty_service_1.AcademicFacultyServices.createFaculty(AcademicFacultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
    });
}));
// get a single Faculty
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.AcademicFacultyServices.getSingleFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Faculty get successfully',
        data: result,
    });
}));
// search and filter Faculties
const getAllFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.headers.authorization);
    // console.log('Request User =>', req.user);
    const filters = (0, pick_1.default)(req.query, filterableFields_1.AcademicFacultyFilterableFields);
    const paginationOption = (0, pick_1.default)(req.query, paginationC_1.paginationFields);
    const result = yield academicFaculty_service_1.AcademicFacultyServices.getAllFaculties(filters, paginationOption);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculties get successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// Update Faculty
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield academicFaculty_service_1.AcademicFacultyServices.updateFaculty(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty Updated successfully',
        data: result,
    });
}));
// Delete Faculty
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.AcademicFacultyServices.deleteFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faculty Deleted successfully',
        data: result,
    });
}));
exports.AcademicFacultyController = {
    createAcademicFaculty,
    getSingleFaculty,
    getAllFaculties,
    updateFaculty,
    deleteFaculty,
};
