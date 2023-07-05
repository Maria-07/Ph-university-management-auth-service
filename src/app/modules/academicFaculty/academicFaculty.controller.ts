import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AcademicFacultyFilterableFields } from '../../../constance/filterableFields';
import { paginationFields } from '../../../constance/paginationC';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyServices } from './academicFaculty.service';

// Create a Faculty
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...AcademicFacultyData } = req.body;
    const result = await AcademicFacultyServices.createFaculty(
      AcademicFacultyData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  }
);

// get a single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty get successfully',
    data: result,
  });
});

// search and filter Faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.headers.authorization);

  // console.log('Request User =>', req.user);

  const filters = pick(req.query, AcademicFacultyFilterableFields);

  const paginationOption = pick(req.query, paginationFields);

  const result = await AcademicFacultyServices.getAllFaculties(
    filters,
    paginationOption
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties get successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicFacultyServices.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated successfully',
    data: result,
  });
});

// Delete Faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
