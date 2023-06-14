import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import { StudentController } from './studentController';

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
