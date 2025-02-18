import { useDispatch, useSelector } from 'react-redux';
import { selectFavoriteTeacherById, selectTeachersById } from '../../redux/teachers/selectors';
import { FiHeart } from 'react-icons/fi';
import { LuBookOpen } from 'react-icons/lu';
import { useState } from 'react';
import { TeacherReviews } from '../TeacherReviews/TeacherReviews';
import css from './Teacher.module.css';
import { selectUserID, selectUserTheme } from '../../redux/auth/selectorsAuth';
import { toggleFavoriteTeacher } from '../../redux/teachers/operations';
import ModalWindow from '../ModalWindow/ModalWindow';
import { RestrictionForGuests } from '../RestrictionForGuests/RestrictionForGuests';

export const Teacher = ({ id, filterLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector(selectUserID);
  const [isOpenReviews, setIsOpenReviews] = useState(() => {
    if (!userId) return false;
    const savedState = localStorage.getItem(`teacher-${id}-isOpen-${userId}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  const teacher = useSelector(selectTeachersById(id));
  const userTheme = useSelector(selectUserTheme);
  const isFavorite = useSelector(selectFavoriteTeacherById(id));
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!teacher) {
    return <p>Teacher not found.</p>;
  }

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

  const handleToggle = () => {
    const newIsOpen = !isOpenReviews;
    setIsOpenReviews(newIsOpen);

    if (userId) {
      localStorage.setItem(`teacher-${id}-isOpen-${userId}`, JSON.stringify(newIsOpen));
    }
  };

  const handleFavoriteClick = () => {
    if (userId === null) {
      openModal();
    } else {
      dispatch(toggleFavoriteTeacher({ userId, teacher }));
    }
  };

  const dynamicStyles = {
    color: {
      background: userTheme,
    },
  };

  return (
    <div className={css.contCard}>
      <div className={css.photoWrapper}>
        <div
          className={`${css.backgroundPhoto} ${userTheme ? '' : css.backgroundColorPhoto}`}
          style={userTheme ? dynamicStyles.color : {}}
        ></div>
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
          <FiHeart
            style={{
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              color: isFavorite ? ' #f4c550' : 'black',
              fill: isFavorite ? ' #f4c550' : 'white',
            }}
            onClick={handleFavoriteClick}
          />
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

        <button type="button" className={css.btnReadMore} onClick={handleToggle}>
          {isOpenReviews ? 'Hide reviews' : 'Read more'}
        </button>
        {isOpenReviews && <TeacherReviews id={id} filterLevel={filterLevel} />}
        {!isOpenReviews && (
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
        )}
      </div>

      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <RestrictionForGuests closeModal={closeModal} />
      </ModalWindow>
    </div>
  );
};
