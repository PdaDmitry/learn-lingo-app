import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import css from './TeacherFilterForm.module.css';
import { fetchTeachersThunc } from '../../redux/teachers/operations';
import { selectUserFilters, selectUserID } from '../../redux/auth/selectorsAuth';
import { updateUserFilters } from '../../redux/auth/operationsAuth';
import { customStyles, languageOptions, levelOptions, priceOptions } from '../../options';

export const TeacherFilterForm = ({
  setFilterLevel,
  setGuestFilterLanguage,
  setGuestFilterPrice,
}) => {
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
      if (field === 'level') {
        setLevel(value);
        setFilterLevel(value);
      }
      if (field === 'price') setPrice(value);
    } else {
      // Для гостей
      setLogOutFilters(prev => ({ ...prev, [field]: value }));
      if (field === 'language') setGuestFilterLanguage(value);
      if (field === 'level') setFilterLevel(value);
      if (field === 'price') setGuestFilterPrice(value);
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

      // console.log('useEffect 1 LogOut users:', filters);
      // console.log('\n');

      dispatch(fetchTeachersThunc(filters));
    }
  }, [logOutFilters, dispatch, userId]);

  // Для авторизованных: загрузка фильтров из состояния пользователя
  useEffect(() => {
    if (userId && userFilters && !isInitialized) {
      setFilterLevel(userFilters.level || '');
      setLanguage(userFilters.language || '');
      setLevel(userFilters.level || '');
      setPrice(userFilters.price ? parseFloat(userFilters.price) : '');

      // setIsInitialized(true); // Помечаем, что данные загружены//////////////////
      // console.log(
      //   'useEffect 3! filters from base:',
      //   userFilters.language,
      //   userFilters.level,
      //   userFilters.price
      // );
      // console.log('\n');
    }
  }, [userId, userFilters, dispatch, isInitialized]);

  useEffect(() => {
    if (userId && userFilters) {
      // console.log('useEffect 2');
      setIsInitialized(true);
      dispatch(fetchTeachersThunc(userFilters)); // Вызываем только fetch
    }
  }, [userId, userFilters, dispatch]);

  useEffect(() => {
    if (userId && isInitialized) {
      const filters = {
        language,
        level,
        price,
      };

      if (
        filters.language !== userFilters.language ||
        filters.level !== userFilters.level ||
        +filters.price !== +userFilters.price
      ) {
        // console.log('useEffect 4: filters are different');
        dispatch(updateUserFilters({ userId, filters }));
      }

      // dispatch(updateUserFilters({ userId, filters }));
    }
  }, [userId, language, level, price, dispatch, isInitialized, userFilters]);

  return (
    <form className={css.contFilter}>
      <div className={css.contLanguage}>
        <label htmlFor="language" className={css.filterTitle}>
          Language
        </label>

        <Select
          options={languageOptions}
          value={
            userId
              ? { value: language, label: language || 'Select Language' }
              : {
                  value: logOutFilters.language || '',
                  label: logOutFilters.language || 'Select Language',
                }
          }
          onChange={option => handleFilterChange('language', option?.value || '')}
          styles={customStyles}
          className={css.languageField}
          isSearchable={false}
        />
      </div>

      <div className={css.contLevel}>
        <label htmlFor="level" className={css.filterTitle}>
          Level of knowledge
        </label>

        <Select
          options={levelOptions}
          value={
            userId
              ? { value: level, label: level || 'Select Level' }
              : { value: logOutFilters.level || '', label: logOutFilters.level || 'Select Level' }
          }
          onChange={option => handleFilterChange('level', option?.value || '')}
          styles={customStyles}
          className={css.levelField}
          isSearchable={false}
        />
      </div>

      <div className={css.contPrice}>
        <label htmlFor="price" className={css.filterTitle}>
          Price
        </label>

        <Select
          options={priceOptions}
          value={
            userId
              ? { value: price, label: price || 'Select Price' }
              : { value: logOutFilters.price || '', label: logOutFilters.price || 'Select Price' }
          }
          onChange={option => handleFilterChange('price', option?.value || '')}
          styles={customStyles}
          className={css.priceField}
          isSearchable={false}
        />
        {/* <p>$</p> */}
      </div>
    </form>
  );
};
