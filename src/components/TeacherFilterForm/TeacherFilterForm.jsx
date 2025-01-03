import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './TeacherFilterForm.module.css';
import { fetchTeachersThunc } from '../../redux/teachers/operations';
import { selectUserFilters, selectUserID } from '../../redux/auth/selectorsAuth';
import { updateUserFilters } from '../../redux/auth/operationsAuth';

export const TeacherFilterForm = () => {
  const [logOutFilters, setLogOutFilters] = useState({ language: '', level: '', price: '' });
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const userId = useSelector(selectUserID);
  const userFilters = useSelector(selectUserFilters);
  // console.log('userFilters: ', userFilters);

  const dispatch = useDispatch();

  // Обработчик изменений для фильтров
  const handleFilterChange = (field, value) => {
    if (userId) {
      // Для авторизованных
      if (field === 'language') setLanguage(value);
      if (field === 'level') setLevel(value);
      if (field === 'price') setPrice(value);
    } else {
      // Для гостей
      setLogOutFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  // Для гостей: обновление фильтров
  useEffect(() => {
    if (!userId) {
      const filters = {
        language: logOutFilters.language || '',
        level: logOutFilters.level || '',
        price: logOutFilters.price ? parseFloat(logOutFilters.price) : '',
      };

      console.log('useEffect 1 LogOut users:', filters);
      console.log('\n');

      dispatch(fetchTeachersThunc(filters));
    }
  }, [logOutFilters, dispatch, userId]);

  useEffect(() => {
    if (userId && userFilters) {
      console.log('useEffect 2');

      dispatch(fetchTeachersThunc(userFilters)); // Вызываем только fetch
    }
  }, [userId, userFilters, isInitialized, dispatch]);

  // Для авторизованных: загрузка фильтров из состояния пользователя
  useEffect(() => {
    if (userId && userFilters && !isInitialized) {
      // dispatch(fetchTeachersThunc(userFilters));
      setLanguage(userFilters.language || '');
      setLevel(userFilters.level || '');
      setPrice(userFilters.price ? parseFloat(userFilters.price) : '');

      setIsInitialized(true); // Помечаем, что данные загружены
      console.log(
        'useEffect 3! filters from base:',
        userFilters.language,
        userFilters.level,
        userFilters.price
      );
      console.log('\n');
    }
  }, [userId, userFilters, dispatch, isInitialized]);

  useEffect(() => {
    if (userId && isInitialized) {
      const filters = {
        language,
        level,
        price,
      };

      console.log('useEffect 4 for registered user:', filters);
      console.log('\n');

      dispatch(updateUserFilters({ userId, filters }));
    }
  }, [userId, language, level, price, dispatch, isInitialized]);

  return (
    <form className={css.contFilter}>
      <div className={css.contLanguage}>
        <label htmlFor="language">Language:</label>

        <select
          id="language"
          value={userId ? language : logOutFilters.language}
          onChange={e => handleFilterChange('language', e.target.value)}
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
          value={userId ? level : logOutFilters.level}
          onChange={e => handleFilterChange('level', e.target.value)}
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
          value={userId ? price : logOutFilters.price}
          onChange={e => handleFilterChange('price', e.target.value)}
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

// useEffect(() => {
//   if (userId) {
//     dispatch(updateUserFilters({ userId, loginFilters }));
//   }
// }, [userId, loginFilters, dispatch]);
