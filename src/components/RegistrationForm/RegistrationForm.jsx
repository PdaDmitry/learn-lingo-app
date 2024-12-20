import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validationSchemas';
import css from './RegistrationForm.module.css';

export const RegistrationForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = data => {
    console.log(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.contRegistrationForm}>
      <h1 className={css.titleText}>Registration</h1>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information
      </p>
      <div className={css.inputElem}>
        <input {...register('name')} placeholder="Name" className={css.input} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className={css.inputElem}>
        <input {...register('email')} placeholder="Email" className={css.input} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={css.inputLastElem}>
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className={css.input}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" className={css.btnRegistrationForm}>
        Sign Up
      </button>
    </form>
  );
};
