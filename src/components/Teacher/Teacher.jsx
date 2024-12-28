import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoriteTeacherById,
  selectIsLoading,
  selectTeacherForId,
  selectTeachersById,
} from '../../redux/teachers/selectors';
import { FiHeart } from 'react-icons/fi';
import { LuBookOpen } from 'react-icons/lu';
import { useState } from 'react';
import { TeacherReviews } from '../TeacherReviews/TeacherReviews';
// import ModalWindow from '../ModalWindow/ModalWindow';
import css from './Teacher.module.css';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { toggleFavoriteTeacher } from '../../redux/teachers/operations';
// import { OnlyForAuthorized } from '../OnlyForAuthorized/OnlyForAuthorized';
import toast from 'react-hot-toast';

export const Teacher = ({ id }) => {
  const [isOpenReviews, setIsOpenReviews] = useState(() => {
    const savedState = localStorage.getItem(`teacher-${id}-isOpen`);
    return savedState ? JSON.parse(savedState) : false;
  });

  const dispatch = useDispatch();

  const teacher = useSelector(selectTeachersById(id));
  const userId = useSelector(selectUserID);
  const isFavorite = useSelector(selectFavoriteTeacherById(id));

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
    localStorage.setItem(`teacher-${id}-isOpen`, JSON.stringify(newIsOpen));
  };

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const handleFavoriteClick = () => {
    if (userId === null) {
      // openModal();
      toast.error('This functionality is available only to authorized users!', {
        duration: 4000,
        position: 'top-center',
        style: { background: 'orange', color: 'black' },
      });
    } else {
      dispatch(toggleFavoriteTeacher({ userId, teacher }));
    }
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
            // {clickFavorite? style={{ width: '26px', height: '26px', cursor: 'pointer' }}: style={{ width: '26px', height: '26px', cursor: 'pointer',color:'red' }}}
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
        {isOpenReviews && <TeacherReviews id={id} />}
        {!isOpenReviews && (
          <ul className={css.contLevel}>
            {levels.map((level, index) => (
              <li key={index} className={css.levelItem}>
                #{level}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <OnlyForAuthorized closeModal={closeModal} />
      </ModalWindow> */}
    </div>
  );
};
