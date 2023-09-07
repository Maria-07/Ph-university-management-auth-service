"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managementDepartmentSearchableFields = exports.adminSearchableFields = exports.facultySearchableFields = exports.studentSearchableFields = exports.academicDepartmentSearchableFields = exports.academicFacultySearchableFields = exports.academicSemesterSearchableFields = void 0;
exports.academicSemesterSearchableFields = ['title', 'code', 'year'];
exports.academicFacultySearchableFields = ['title'];
exports.academicDepartmentSearchableFields = ['title'];
exports.studentSearchableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.adminSearchableFields = [
    'email',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
exports.managementDepartmentSearchableFields = ['title'];
