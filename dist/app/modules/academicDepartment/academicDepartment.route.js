"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
// create a Faculty
router.post('/create-department', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
// get by id
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleDepartment);
// get all
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllDepartments);
// update a Faculty
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.updateDepartment);
// get by id
router.delete('/:id', academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment);
exports.AcademicDepartmentRoutes = router;
