import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// create a semester
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

// get by id
router.get('/:id', AcademicSemesterController.getSingleSemester);

// get all
router.get('/', AcademicSemesterController.getAllSemesters);

// update a semester
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

// get by id
router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
