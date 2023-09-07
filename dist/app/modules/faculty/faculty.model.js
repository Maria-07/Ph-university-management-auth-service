"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constance_1 = require("./faculty.constance");
const FacultySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: {
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            middleName: { type: String },
        },
        required: true,
    },
    gender: { type: String, enum: faculty_constance_1.gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: faculty_constance_1.bloodGroup,
    },
    designation: { type: String, required: true },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academicDepartment',
        required: true,
    },
});
exports.Faculty = (0, mongoose_1.model)('Faculty', FacultySchema);
