import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';
import { avatarMap } from '../../avatarMap.js';
import css from './TeacherReviews.module.css';

export const TeacherReviews = ({ id }) => {
  const teacherReviews = useSelector(selectTeachersById(id));

  const { experience, reviews, levels } = teacherReviews;
  return (
    <div>
      <p className={css.teacherExperience}>{experience}</p>
      {reviews.length > 0 ? (
        <ul className={css.contReviews}>
          {reviews.map((review, index) => (
            <li key={index} className={css.reviewsElem}>
              <div className={css.contNameRating}>
                {/* <p className={css.avatar}>Avatar</p> */}
                <img
                  src={avatarMap[review.reviewer_name]}
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
          <li key={index} className={css.levelItem}>
            #{level}
          </li>
        ))}
      </ul>
      <button type="button" className={css.btnBookLesson}>
        Book trial lesson
      </button>
    </div>
  );
};
