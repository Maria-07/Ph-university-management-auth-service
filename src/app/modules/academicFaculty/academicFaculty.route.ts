import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

// create a Faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

// get by id
router.get('/:id', AcademicFacultyController.getSingleFaculty);

// get all
router.get('/', AcademicFacultyController.getAllFaculties);

// update a Faculty
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.UpdateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

// get by id
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
