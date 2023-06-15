import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExit = await AcademicDepartment.findOne({
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

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('academicDepartment', academicDepartmentSchema);
