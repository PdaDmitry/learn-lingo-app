import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BooleanSchema } from 'yup';
import { IoMdClose } from 'react-icons/io';
import css from './BookLessonForm.module.css';
import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';

export const BookLessonForm = ({ closeModal, id }) => {
  const teacherData = useSelector(selectTeachersById(id));
  const { avatar_url, name, surname } = teacherData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BooleanSchema),
  });

  const onSubmit = data => {
    console.log(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.contBookForm}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titleText}>Book trial lesson</h1>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss your learning goals,
        and tailor the lesson to your specific needs.
      </p>

      <div className={css.contTeacherPhotoName}>
        <img src={avatar_url} alt="Teacher's photo" className={css.teacherPhoto} />
        <div>
          <p className={css.yourTeacher}>Your teacher</p>
          <p className={css.teacherName}>{`${name} ${surname}`}</p>
        </div>
      </div>

      <h2 className={css.survey}>What is your main reason for learning English?</h2>

      <ul className={css.radioGroup}>
        <li className={css.radioOption}>
          <input
            type="radio"
            id="career"
            value="Career"
            {...register('assessmentType')}
            className={css.radioInput}
          />
          <label htmlFor="career" className={css.radioLabel}>
            <img
              src="../../../public/RadioButton-gray.png"
              alt="Radio button"
              className={css.img}
            />
            <p className={css.textRadio}>Career and business</p>
          </label>
        </li>
        <li className={css.radioOption}>
          <input
            type="radio"
            id="lesson"
            value="Lesson"
            {...register('assessmentType')}
            className={css.radioInput}
          />
          <label htmlFor="lesson" className={css.radioLabel}>
            <img
              src="../../../public/RadioButton-gray.png"
              alt="Radio button"
              className={css.img}
            />
            <p className={css.textRadio}>Lesson for kids</p>
          </label>
        </li>
        <li className={css.radioOption}>
          <input
            type="radio"
            id="living"
            value="Living"
            {...register('assessmentType')}
            className={css.radioInput}
          />
          <label htmlFor="living" className={css.radioLabel}>
            <img
              src="../../../public/RadioButton-gray.png"
              alt="Radio button"
              className={css.img}
            />
            <p className={css.textRadio}>Living abroad</p>
          </label>
        </li>
        <li className={css.radioOption}>
          <input
            type="radio"
            id="exams"
            value="Exams"
            {...register('assessmentType')}
            className={css.radioInput}
          />
          <label htmlFor="exams" className={css.radioLabel}>
            <img
              src="../../../public/RadioButton-gray.png"
              alt="Radio button"
              className={css.img}
            />
            <p className={css.textRadio}>Exams and coursework</p>
          </label>
        </li>
        <li className={css.radioOption}>
          <input
            type="radio"
            id="culture"
            value="Culture"
            {...register('assessmentType')}
            className={css.radioInput}
          />
          <label htmlFor="culture" className={css.radioLabel}>
            <img
              src="../../../public/RadioButton-gray.png"
              alt="Radio button"
              className={css.img}
            />
            <p className={css.textRadio}>Culture, travel or hobby</p>
          </label>
        </li>
      </ul>

      <div className={css.inputElem}>
        <input {...register('name')} placeholder="Full Name" className={css.input} />
        {errors.username && <p className={css.textError}>{errors.username.message}</p>}
      </div>

      <div className={css.inputElem}>
        <input {...register('email')} placeholder="Email" className={css.input} />
        {errors.email && <p className={css.textError}>{errors.email.message}</p>}
      </div>

      <div className={css.inputLastElem}>
        <input {...register('phone')} placeholder="Phone number" className={css.input} />
        {errors.phone && <p className={css.textError}>{errors.phone.message}</p>}
      </div>
      <button type="submit" className={css.btnBookForm}>
        Book
      </button>
    </form>
  );
};
