import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// last Users
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// generate Users
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  //increment by 1
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedID = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedID}`;

  return incrementedID;
};

// faculty user
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  //increment by 1
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedID = `F-${incrementedID}`;

  return incrementedID;
};
