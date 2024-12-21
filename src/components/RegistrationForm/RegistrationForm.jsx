import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validationSchemas';
import { IoMdClose } from 'react-icons/io';
import css from './RegistrationForm.module.css';
import { useState } from 'react';

import { LuEyeOff } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';
import { registerUser } from '../../redux/teachers/operations';
// import { registerUser } from '../../redux/teachers/operations';

export const RegistrationForm = ({ closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // const onSubmit = data => {
  //   console.log(data);
  //   closeModal();
  // };

  const onSubmit = async data => {
    await registerUser(data);
    console.log('User registered:', data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.contRegistrationForm}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titleText}>Registration</h1>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information
      </p>
      <div className={css.inputElem}>
        <input {...register('name')} placeholder="Name" className={css.input} />
        {errors.username && <p className={css.textError}>{errors.username.message}</p>}
      </div>

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

      <button type="submit" className={css.btnRegistrationForm}>
        Sign Up
      </button>
    </form>
  );
};
