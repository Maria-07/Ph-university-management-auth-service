import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

//get all students
router.get('/', StudentController.getAllStudents);

// get single students
router.get('/:id', StudentController.getSingleStudent);

// update a Student
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

// delete a student
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
