import { useSelector } from 'react-redux';
import {
  selectMaxPage,
  selectPerPage,
  selectTeachers,
  selectTotal,
} from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './TeacherList.module.css';
import { useEffect, useRef, useState } from 'react';

export const TeacherList = ({ page, filterLevel }) => {
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  // const lastTeacherRef = useRef(null); ///////////////
  const teachers = useSelector(selectTeachers);
  const totalTeachers = useSelector(selectTotal);
  const maxPage = useSelector(selectMaxPage);
  const perPage = useSelector(selectPerPage);
  const containerRef = useRef(null); /////////////

  // console.log('teachers:', teachers);
  // console.log('totalTeachers: ', totalTeachers);
  // console.log('maxPage: ', maxPage);
  // console.log('perPage: ', perPage);
  // console.log('page: ', page);

  if (teachers.length === 0) {
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

  // useEffect(() => {
  //   // Прокрутка к последнему добавленному элементу
  //   if (lastTeacherRef.current) {
  //     lastTeacherRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [displayedTeachers]);

  useEffect(() => {
    // Прокрутка контейнера на 200 пикселей
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 1000, behavior: 'smooth' });
    }
    window.scrollBy({ top: 200, behavior: 'smooth' }); /////////////////////
  }, [displayedTeachers]);

  return (
    // <ul className={css.listTeachers}>
    //   {displayedTeachers.map(teacher => (
    //     <li key={teacher.id}>
    //       <Teacher id={teacher.id} filterLevel={filterLevel} />
    //     </li>
    //   ))}
    // </ul>

    // ====================================================

    // <ul className={css.listTeachers}>
    //   {displayedTeachers.map((teacher, index) => (
    //     <li
    //       key={teacher.id}
    //       ref={index === displayedTeachers.length - 4 ? lastTeacherRef : null} // Прокрутка к предпоследнему элементу
    //     >
    //       <Teacher id={teacher.id} filterLevel={filterLevel} />
    //     </li>
    //   ))}
    // </ul>

    // ====================================================

    <div ref={containerRef} className={css.scrollableContainer}>
      <ul className={css.listTeachers}>
        {displayedTeachers.map(teacher => (
          <li key={teacher.id}>
            <Teacher id={teacher.id} filterLevel={filterLevel} />
          </li>
        ))}
      </ul>
    </div>
  );
};
