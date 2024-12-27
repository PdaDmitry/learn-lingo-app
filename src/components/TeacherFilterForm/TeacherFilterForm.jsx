import { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './TeacherFilterForm.module.css';
// import { fetchTeachersThunc } from './path-to-your-thunk';

export const TeacherFilterForm = () => {
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    // Формируем объект фильтров
    const filters = {
      language,
      level,
      price: price ? parseFloat(price) : 0, // Конвертируем цену в число
    };
    console.log(filters);
    // Передаем фильтры в thunk
    // dispatch(fetchTeachersThunc(filters));
  };

  return (
    <form onSubmit={handleSubmit} className={css.contFilter}>
      <div className={css.contLanguage}>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className={css.languageField}
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      <div className={css.contLevel}>
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          value={level}
          onChange={e => setLevel(e.target.value)}
          className={css.levelField}
        >
          <option value="">Select Level</option>
          <option value="#C2 Proficient">#C2 Proficient</option>
          <option value="#B1 Intermediate">#B1 Intermediate</option>
          <option value="#A2 Elementary">#A2 Elementary</option>
        </select>
      </div>

      <div className={css.contPrice}>
        <label htmlFor="price">Minimum Price ($):</label>
        <select
          id="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className={css.priceField}
        >
          <option value="">Select Price</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <button type="submit">Filter Teachers</button>
    </form>
  );
};
