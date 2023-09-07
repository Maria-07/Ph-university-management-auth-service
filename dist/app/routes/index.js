"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const faculty_router_1 = require("../modules/faculty/faculty.router");
const managementDepartment_route_1 = require("../modules/managementDepartment/managementDepartment.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/users/user.route");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
    {
        path: '/management-departments',
        route: managementDepartment_route_1.ManagementDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/Faculty',
        route: faculty_router_1.FacultyRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => {
    routes.use(route.path, route.route);
});
// routes.use('/api/v1/user', UserRoutes);
// routes.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
exports.default = routes;
