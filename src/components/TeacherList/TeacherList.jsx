import { useSelector } from 'react-redux';
import {
  selectMaxPage,
  selectPerPage,
  selectTeachers,
  selectTotal,
} from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './TeacherList.module.css';
import { useEffect, useState } from 'react';

export const TeacherList = ({ page, filterLevel }) => {
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  const teachers = useSelector(selectTeachers);
  const totalTeachers = useSelector(selectTotal);
  const maxPage = useSelector(selectMaxPage);
  const perPage = useSelector(selectPerPage);

  // console.log('teachers:', teachers);
  // console.log('totalTeachers: ', totalTeachers);
  // console.log('maxPage: ', maxPage);
  // console.log('perPage: ', perPage);
  // console.log('page: ', page);

  if (!teachers.length) {
    return <p>No teachers available</p>;
  }

  useEffect(() => {
    // Очистка и добавление учителей при изменении данных или смене страницы
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    if (page === 1) {
      // Если первая страница, начинаем заново
      setDisplayedTeachers(teachers.slice(0, endIndex));
    } else {
      // Иначе добавляем следующие элементы
      setDisplayedTeachers(prev => [...prev, ...teachers.slice(startIndex, endIndex)]);
    }
  }, [page, teachers, perPage]);

  return (
    <ul className={css.listTeachers}>
      {displayedTeachers.map(teacher => (
        <li key={teacher.id}>
          <Teacher id={teacher.id} filterLevel={filterLevel} />
        </li>
      ))}
    </ul>
  );
};
