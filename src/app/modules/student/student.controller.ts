import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constance/paginationC';
import { studentSearchableFields } from '../../../constance/searchableFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interface';
import { StudentServices } from './student.service';

// get a single Student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentServices.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student get successfully',
    data: result,
  });
});

// search and filter Student
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentSearchableFields);

  const paginationOption = pick(req.query, paginationFields);

  const result = await StudentServices.getAllStudents(
    filters,
    paginationOption
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentServices.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated successfully',
    data: result,
  });
});

// Delete semester
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentServices.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
