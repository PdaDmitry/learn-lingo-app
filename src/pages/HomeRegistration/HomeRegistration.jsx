import { useNavigate } from 'react-router-dom';
import css from './HomeRegistration.module.css';
import Avatar1 from '../../../public/block-1.jpg';
import Avatar2 from '../../../public/block-2.jpg';
import Avatar3 from '../../../public/block-3.jpg';
import Avatar4 from '../../../public/block-4.jpg';
import Avatar5 from '../../../public/block-5.jpg';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/auth/selectorsAuth';
import { useState } from 'react';

const Avatar = {
  '#F4C550': Avatar1,
  '#9FBAAE': Avatar2,
  '#9FB7CE': Avatar3,
  '#E0A39A': Avatar4,
  '#F0AA8D': Avatar5,
};

const colorDependence = {
  '#F4C550': '#FBE9BA',
  '#9FBAAE': '#CBDED3',
  '#9FB7CE': '#BFD6EA',
  '#E0A39A': '#F2C0BD',
  '#F0AA8D': '#F4C8BA',
};

export const HomeRegistration = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const userTheme = useSelector(selectUserTheme);
  // console.log('userTheme ', userTheme);

  const dynamicStyles = {
    dinamicBackground: {
      background: colorDependence[userTheme] || '#FBE9BA',
    },
    btnStarted: {
      background: userTheme || '#F4C550',
    },
    teacherProfile: {
      border: userTheme ? `2px dashed ${userTheme}` : `2px dashed #f4c550`,
    },
  };

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
          <div className={css.backgroundSpan} style={dynamicStyles.dinamicBackground}></div>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
            language proficiency to new heights by connecting with highly qualified and experienced
            tutors.
          </p>
          <button
            type="button"
            className={css.btnStarted}
            onClick={handleButtonClick}
            style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnStarted}
            onMouseEnter={() => setIsHovered(true)} // When the mouse hovers, change the state
            onMouseLeave={() => setIsHovered(false)}
          >
            Get started
          </button>
        </div>
        <img
          src={userTheme ? Avatar[userTheme] : Avatar['#F4C550']}
          alt="Language learning"
          className={css.imgSvg}
        />
      </div>

      <ul className={css.teacherProfile} style={dynamicStyles.teacherProfile}>
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
