import { useNavigate } from 'react-router-dom';
import css from './Home.module.css';
// import { Toaster } from 'react-hot-toast';

export const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/teachers');
  };

  return (
    <div className={css.contHome}>
      {/* <Toaster /> */}
      <div className={css.homeImg}>
        <div className={css.contStarted}>
          <h1 className={css.titleText}>
            Unlock your potential with the best <span className={css.textSpan}>language</span>{' '}
            tutors
          </h1>
          <div className={css.backgroundSpan}></div>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
            language proficiency to new heights by connecting with highly qualified and experienced
            tutors.
          </p>
          <button type="button" className={css.btnStarted} onClick={handleButtonClick}>
            Get started
          </button>
        </div>
        <svg className={css.imgSvg}>
          <use href="/symbol-defs-before-registration.svg#icon-image"></use>
        </svg>
        {/* <img src="../../../public/block-5.jpg" alt="Language learning" className={css.imgSvg} /> */}
      </div>

      <ul className={css.teacherProfile}>
        <li className={css.contUlLi}>
          <p className={css.numberPlus}>32,000 +</p>
          <p className={css.teacherProfileText}>Experienced tutors</p>
        </li>
        <li className={css.contUlLi}>
          <p className={css.numberPlus}>300,000 +</p>
          <p className={css.teacherProfileText}>5-star tutor reviews</p>
        </li>
        <li className={css.contUlLi}>
          <p className={css.numberPlus}>120 +</p>
          <p className={`${css.teacherProfileText} ${css.subjectsClass}`}>Subjects taught</p>
        </li>
        <li className={css.contUlLi}>
          <p className={css.numberPlus}>200 +</p>
          <p className={css.teacherProfileText}>Tutor nationalities</p>
        </li>
      </ul>
    </div>
  );
};
