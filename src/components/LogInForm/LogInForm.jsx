import { useForm } from 'react-hook-form';
import { loginSchema } from '../../validationSchemas';
import { IoMdClose } from 'react-icons/io';
import { LuEyeOff } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './LogInForm.module.css';

export const LogInForm = ({ closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //   const onSubmit = async data => {
  //     try {
  //       const { email, password } = data;
  //
  //       await LogIn(email, password); // Функция для логина
  //       console.log('Logged in successfully');
  //     } catch (error) {
  //       console.error('Login failed:', error);
  //     }
  //   };

  const onSubmit = data => {
    console.log(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.contLogInForm}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titleText}>Log In</h1>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and continue your search
        for an teacher.
      </p>
      <div className={css.inputElem}>
        <input {...register('email')} placeholder="Email" className={css.input} />
        {errors.email && <p className={css.textError}>{errors.email.message}</p>}
      </div>
      <div className={css.inputLastElem}>
        <div className={css.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className={css.input}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <LuEye style={{ width: '20px', height: '20px' }} />
            ) : (
              <LuEyeOff style={{ width: '20px', height: '20px' }} />
            )}
          </button>
        </div>
        {errors.password && <p className={css.textError}>{errors.password.message}</p>}
      </div>
      <button type="submit" className={css.btnLogInForm}>
        Log In
      </button>
    </form>
  );
};
