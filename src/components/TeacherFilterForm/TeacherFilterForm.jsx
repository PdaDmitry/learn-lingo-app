import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './TeacherFilterForm.module.css';
import { fetchTeachersThunc } from '../../redux/teachers/operations';
import { selectUserFilters, selectUserID } from '../../redux/auth/selectorsAuth';
import { updateUserFilters } from '../../redux/auth/operationsAuth';

export const TeacherFilterForm = () => {
  const userId = useSelector(selectUserID);
  const userFilters = useSelector(selectUserFilters);

  // console.log('userFilters:', userFilters);

  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (userFilters) {
      setLanguage(userFilters.language || '');
      setLevel(userFilters.level || '');
      setPrice(userFilters.price?.toString() || '');
    }
  }, [userFilters]);

  useEffect(() => {
    if (language || level || price) {
      const filters = {
        language: language || '',
        level: level || '',
        price: price ? parseFloat(price) : '',
      };
      dispatch(fetchTeachersThunc(filters)); // Загружаем учителей с новыми фильтрами
      if (userId) {
        dispatch(updateUserFilters({ userId, filters })); // Сохраняем фильтры в базе
      }
    }
  }, [language, level, price, dispatch, userId]);

  // const handleFormSubmit = e => {
  //   e.preventDefault(); // Останавливает перезагрузку страницы
  // };   onSubmit={handleFormSubmit}

  return (
    <form className={css.contFilter}>
      <div className={css.contLanguage}>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={e => {
            setLanguage(e.target.value);
          }}
          className={css.languageField}
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Italian">Italian</option>
          <option value="Korean">Korean</option>
          <option value="Mandarin Chinese">Mandarin Chinese</option>
          <option value="Spanish">Spanish</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
      </div>

      <div className={css.contLevel}>
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          value={level}
          onChange={e => {
            setLevel(e.target.value);
          }}
          className={css.levelField}
        >
          <option value="">Select Level</option>
          <option value="A1 Beginner">#A1 Beginner</option>
          <option value="A2 Elementary">#A2 Elementary</option>
          <option value="B1 Intermediate">#B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">#B2 Upper-Intermediate</option>
          <option value="C1 Advanced">#C1 Advanced</option>
          <option value="C2 Proficient">#C2 Proficient</option>
        </select>
      </div>

      <div className={css.contPrice}>
        <label htmlFor="price">Minimum Price ($):</label>
        <select
          id="price"
          value={price}
          onChange={e => {
            setPrice(e.target.value);
          }}
          className={css.priceField}
        >
          <option value="">Select Price</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        {/* <p>$</p> */}
      </div>
    </form>
  );
};
