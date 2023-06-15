import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './faculty.constance';
import { FacultyModel, IFaculty } from './faculty.interface';

const FacultySchema = new Schema<IFaculty>({
  id: { type: String, required: true },
  name: {
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String },
    },
    required: true,
  },
  gender: { type: String, enum: gender, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  designation: { type: String, required: true },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
});

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
