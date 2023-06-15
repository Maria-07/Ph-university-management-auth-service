import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { academicDepartmentFilterableFields } from '../../../constance/filterableFields';
import { paginationFields } from '../../../constance/paginationC';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentServices } from './academicDepartment.services';

// Create a Department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...AcademicDepartmentData } = req.body;
    const result = await AcademicDepartmentServices.createDepartment(
      AcademicDepartmentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  }
);

// get a single Department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Department get successfully',
    data: result,
  });
});

// search and filter Faculties
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);

  const paginationOption = pick(req.query, paginationFields);

  const result = await AcademicDepartmentServices.getAllDepartments(
    filters,
    paginationOption
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Fetch successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Update Faculty
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDepartmentServices.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Updated successfully',
    data: result,
  });
});

// Delete Department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
