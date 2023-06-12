import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/users/user.route';
const routes = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => {
  routes.use(route.path, route.route);
});

// routes.use('/api/v1/user', UserRoutes);
// routes.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

export default routes;
