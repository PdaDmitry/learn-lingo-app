import * as yup from 'yup';

export const userSchema = yup.object().shape({
  // username: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
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

export const bookLesson = yup.object().shape({
  fullName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: yup.string().email('Must be a valid email!').required('Required'),
  number: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .matches(/^[\d-]+$/, 'Number can only contain digits and dashes'),
});
