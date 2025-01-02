import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './TeacherFilterForm.module.css';
import { fetchTeachersThunc } from '../../redux/teachers/operations';
import { selectUserFilters, selectUserID } from '../../redux/auth/selectorsAuth';
import { updateUserFilters } from '../../redux/auth/operationsAuth';

export const TeacherFilterForm = () => {
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');

  const userId = useSelector(selectUserID);
  const userFilters = useSelector(selectUserFilters);
  // console.log('userFilters: ', userFilters);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      const filters = {
        language: language || '',
        level: level || '',
        price: price ? parseFloat(price) : '',
      };

      dispatch(fetchTeachersThunc(filters));
    }
  }, [language, level, price, dispatch, userId]);

  useEffect(() => {
    if (userId && userFilters) {
      setLanguage(userFilters.language || '');
      setLevel(userFilters.level || '');
      setPrice(userFilters.price?.toString() || '');

      console.log('userFilters: ', userFilters);

      dispatch(fetchTeachersThunc(userFilters));
    }
  }, [userId, userFilters, dispatch]);

  useEffect(() => {
    if (userId) {
      const filters = {
        language: language || '',
        level: level || '',
        price: price ? parseFloat(price) : '',
      };

      dispatch(updateUserFilters({ userId, filters }));
      // dispatch(fetchTeachersThunc(filters));
    }
  }, [language, level, price, userId, dispatch]);

  return (
    <form className={css.contFilter}>
      <div className={css.contLanguage}>
        <label htmlFor="language">Language:</label>

        <select
          id="language"
          value={language}
          onChange={e => {
            // console.log('New language:', e.target.value);
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
