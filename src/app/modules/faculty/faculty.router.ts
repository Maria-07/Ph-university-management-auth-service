import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

//get all students
router.get('/', FacultyController.getAllFaculty);

// get single students
router.get('/:id', FacultyController.getSingleFaculty);

// update a Student
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

// delete a faculty
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
