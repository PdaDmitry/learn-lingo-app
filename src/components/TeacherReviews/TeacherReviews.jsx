import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';
import { avatarMap } from '../../avatarMap.js';
import css from './TeacherReviews.module.css';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import { BookLessonForm } from '../BookLessonForm/BookLessonForm.jsx';
import { useState } from 'react';
import avatarFrank from '../../../public/image Frank.jpg';
import avatarEve from '../../../public/image Eve.jpg';
import avatarGrace from '../../../public/image Grace.jpg';
import avatarHenry from '../../../public/image Henry.jpg';
import avatarAlex from '../../../public/image Alex.jpg';
import avatarEmily from '../../../public/image Emily.jpg';
import { selectUserTheme } from '../../redux/auth/selectorsAuth.js';
import { colorDependence } from '../../options.js';

const avatar = {
  Frank: avatarFrank,
  Eve: avatarEve,
  Grace: avatarGrace,
  Henry: avatarHenry,
  Alex: avatarAlex,
  Emily: avatarEmily,
};

export const TeacherReviews = ({ id, filterLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const teacherReviews = useSelector(selectTeachersById(id));
  const userTheme = useSelector(selectUserTheme);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dynamicStyles = {
    dinamicBackground: {
      background: colorDependence[userTheme] || '#FBE9BA',
    },
    btnTheme: {
      background: userTheme || '#F4C550',
    },
  };

  const { experience, reviews, levels } = teacherReviews;
  return (
    <div>
      <p className={css.teacherExperience}>{experience}</p>
      {reviews.length > 0 ? (
        <ul className={css.contReviews}>
          {reviews.map((review, index) => (
            <li key={index} className={css.reviewsElem}>
              <div className={css.contNameRating}>
                <img
                  src={avatarMap[review.reviewer_name] || avatar[review.reviewer_name]}
                  alt={review.reviewer_name}
                  className={css.avatar}
                />
                <div>
                  <p className={css.textName}>{review.reviewer_name}</p>
                  <div className={css.svgRating}>
                    <svg className={css.svgStar}>
                      <use href="/symbol-defs-lan.svg#icon-star"></use>
                    </svg>
                    <p>{review.reviewer_rating}.0</p>
                  </div>
                </div>
              </div>
              <p className={css.textComent}>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>There are no reviews for this teacher.</p>
      )}
      <ul className={css.contLevel}>
        {levels.map((level, index) => (
          <li
            key={index}
            className={`${css.levelItem} ${
              level === filterLevel && userTheme == null ? css.selectedLevel : ''
            }`}
            style={
              level === filterLevel && userTheme != null
                ? { backgroundColor: userTheme, border: 'none' }
                : {}
            }
          >
            #{level}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={css.btnBookLesson}
        onClick={openModal}
        style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Book trial lesson
      </button>

      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <BookLessonForm closeModal={closeModal} id={id} />
      </ModalWindow>
    </div>
  );
};
