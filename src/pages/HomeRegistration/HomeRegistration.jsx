import { useNavigate } from 'react-router-dom';
import css from './HomeRegistration.module.css';
import Avatar1 from '../../../public/block-1.jpg';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/auth/selectorsAuth';

export const HomeRegistration = () => {
  const navigate = useNavigate();
  const userTheme = useSelector(selectUserTheme);
  console.log('userTheme ', userTheme);

  const handleButtonClick = () => {
    navigate('/teachers');
  };

  return (
    <div className={css.contHome}>
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
        <img src={Avatar1} alt="Language learning" className={css.imgSvg} />
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
