"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//application routes
// console.log(process.env.DATABASE_URL)
// app.use('/api/v1/user', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1/', routes_1.default);
// const academicSemester = {
//   code: '01',
//   year: '2025',
// };
// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();
//testing purpose
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing new error logger')
//   //   throw new ApiError(400, 'User not found throw error')
// })
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('UnHandle project rejection'))
//   console.log(x)
// })
// global error handler
app.use(globalErrorHandler_1.default);
// Handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api not found',
            },
        ],
    });
    next();
});
exports.default = app;
