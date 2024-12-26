import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too Long!'),
  email: yup.string().email('Must be a valid email!').required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const bookLessonSchema = yup.object().shape({
  fullName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: yup.string().email('Must be a valid email!').required('Required'),
  number: yup
    .string()
    .required('Required')
    .matches(/^[\d-]+$/, 'Number can only contain digits and dashes'),
  assessmentType: yup.string().required('Please select an option'),
});
