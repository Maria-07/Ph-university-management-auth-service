import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, enum: academicSemesterTitles, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: academicSemesterCodes, required: true },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExit) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic Semester is Exist ❗❗');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academicSemester',
  academicSemesterSchema
);

// Handling same year and same semester issue

// Data -> check -? same year and same semester
