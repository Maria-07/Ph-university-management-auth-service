import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExit = await AcademicFaculty.findOne({
    title: this.title,
  });

  if (isExit) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `👉 ${this.title} 🐼 is already Exist ❗❗`
    );
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
);
