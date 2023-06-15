import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constance/paginationC';
import { facultySearchableFields } from '../../../constance/searchableFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import { FacultyServices } from './faculty.service';

// Get all search and filter Faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultySearchableFields);

  const paginationOption = pick(req.query, paginationFields);

  const result = await FacultyServices.getAllFaculty(filters, paginationOption);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get a single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyServices.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty get successfully',
    data: result,
  });
});

// Update Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyServices.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated successfully',
    data: result,
  });
});

// Delete Faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyServices.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
