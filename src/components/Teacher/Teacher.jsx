import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';
import { FiHeart } from 'react-icons/fi';
import { LuBookOpen } from 'react-icons/lu';
import css from './Teacher.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Teacher = ({ id }) => {
  const teacher = useSelector(selectTeachersById(id));
  const navigate = useNavigate();
  // const location = useLocation(); // Чтобы отслеживать текущий маршрут
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  const {
    lessons_done,
    rating,
    price_per_hour,
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    levels,
    avatar_url,
  } = teacher;

  const handleToggleReviews = () => {
    if (isReviewsVisible) {
      navigate('/teachers');
    } else {
      navigate('reviews');
    }
    setIsReviewsVisible(!isReviewsVisible);
  };

  return (
    <div className={css.contCard}>
      <div className={css.photoWrapper}>
        <div className={css.backgroundYellow}></div>
        <div className={css.backgroundWhite}></div>
        <img src={avatar_url} alt="Teacher's photo" className={css.teacherPhoto} />
        <svg className={css.iconGroup}>
          <use href="/symbol-defs-teacher-card.svg#icon-Group-82"></use>
        </svg>
      </div>
      <div className={css.portfolio}>
        <div className={css.info}>
          <p className={css.langText}>Languages</p>
          <ul className={css.ratingPrice}>
            <li>
              {/* <svg className={css.svgBook}>
                <use href="/symbol-defs-lan.svg#icon-book-open-01"></use>
              </svg> */}
              <LuBookOpen style={{ width: '15px', height: '16px', marginRight: '8px' }} />
              <p className={css.ratingPriceText}>Lessons online</p>
            </li>
            <li>
              <p className={css.ratingPriceText}>Lessons done: {lessons_done}</p>
            </li>
            <li>
              <svg className={css.svgStar}>
                <use href="/symbol-defs-lan.svg#icon-star"></use>
              </svg>
              <p className={css.ratingPriceText}>Rating: {rating}</p>
            </li>
            <li>
              <p className={css.ratingPriceText}>
                Price / 1 hour: <span className={css.spanPrice}>{price_per_hour}$</span>
              </p>
            </li>
          </ul>
          {/* <svg className={css.iconHeart}>
            <use href="/symbol-defs-lan.svg#icon-heart"></use>
          </svg> */}
          <FiHeart style={{ width: '26px', height: '26px' }} />
        </div>
        <h2 className={css.teacherName}>{`${name} ${surname}`}</h2>
        <ul className={css.categories}>
          <li>
            <p className={css.categoriesText}>
              <span className={css.categoriesTextSpan}>Speaks:</span>{' '}
              <span className={css.speaks}>{languages.join(', ')}</span>
            </p>
          </li>
          <li>
            <p className={css.categoriesText}>
              <span className={css.categoriesTextSpan}>Lesson Info:</span> {lesson_info}
            </p>
          </li>
          <li>
            <p className={css.categoriesText}>
              <span className={css.categoriesTextSpan}>Conditions:</span> {conditions}
            </p>
          </li>
        </ul>

        {/* <NavLink to="reviews" className={css.featuresReviewsClass}>
          <button type="button">Read more</button>
        </NavLink> */}
        <button type="button" onClick={handleToggleReviews}>
          {isReviewsVisible ? 'Hide' : 'Read more'}
        </button>
        <Outlet />
        {/* <button type="button">Read more</button> */}
        <p>{levels.join(', ')}</p>
      </div>
    </div>
  );
};
