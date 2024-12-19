import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';
import css from './TeacherReviews.module.css';

export const TeacherReviews = ({ id }) => {
  const teacherReviews = useSelector(selectTeachersById(id));

  const { experience, reviews, levels } = teacherReviews;
  return (
    <div>
      <p className={css.teacherExperience}>{experience}</p>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <div>
                <p>Avatar</p>
                <div>
                  <p>{review.reviewer_name}</p>
                  <p>{review.reviewer_rating}</p>
                </div>
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this teacher.</p>
      )}
      <p>{levels.join(', ')}</p>
      <button type="button">Book trial lesson</button>
    </div>
  );
};
