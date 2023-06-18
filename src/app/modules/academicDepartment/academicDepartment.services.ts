import { SortOrder } from 'mongoose';
import { academicDepartmentSearchableFields } from '../../../constance/searchableFields';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOption,
} from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create a Department
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

// get all Department
const getAllDepartments = async (
  filters: IAcademicDepartmentFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculationPagination(paginationOption);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a single Department
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

// updated Department
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

// Delete Faculty
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(
    { _id: id },
    { new: true }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
