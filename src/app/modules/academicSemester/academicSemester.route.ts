import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
