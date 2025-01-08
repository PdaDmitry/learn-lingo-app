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
  const lastTeacherRef = useRef(null);

  const teachers = useSelector(selectTeachers);
  const totalTeachers = useSelector(selectTotal);
  const maxPage = useSelector(selectMaxPage);
  const perPage = useSelector(selectPerPage);
  const containerRef = useRef(null);

  useEffect(() => {
    // console.log('Effect 1');

    console.log('totalTeachers: ', totalTeachers);
    console.log('maxPage: ', maxPage);
    console.log('page: ', page);
    console.log('\n');
  }, [totalTeachers, maxPage, page]);

  useEffect(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    // console.log('teachers:', teachers);
    // console.log('Page: ', page);

    if (page === 1) {
      setDisplayedTeachers(teachers.slice(startIndex, endIndex));
    } else {
      //Добавить проверку через состояние, если сработала функция
      // setDisplayedTeachers(prev => [...prev, ...teachers.slice(startIndex, endIndex)]);
      setDisplayedTeachers(teachers.slice(0, endIndex));
    }
  }, [page, teachers]);

  useEffect(() => {
    console.log('displayedTeachers: ', displayedTeachers);
    if (lastTeacherRef.current) {
      lastTeacherRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollBy({ top: 202, behavior: 'smooth' });
  }, [displayedTeachers]);

  if (teachers.length === 0) {
    console.log('teachers.length: ', teachers.length);
    return <p>No teachers available</p>;
  }

  return (
    <div ref={containerRef} className={css.scrollableContainer}>
      <ul className={css.listTeachers}>
        {displayedTeachers.map((teacher, index) => (
          <li key={teacher.id} ref={index === displayedTeachers.length - 4 ? lastTeacherRef : null}>
            <Teacher id={teacher.id} filterLevel={filterLevel} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// useEffect(() => {
//   // Прокрутка контейнера на 200 пикселей
//   if (containerRef.current) {
//     containerRef.current.scrollBy({ top: 722, behavior: 'smooth' });
//   }
//   window.scrollBy({ top: 202, behavior: 'smooth' }); /////////////////////
// }, [displayedTeachers]);

// ====================================================

// <ul className={css.listTeachers}>
//   {displayedTeachers.map(teacher => (
//     <li key={teacher.id}>
//       <Teacher id={teacher.id} filterLevel={filterLevel} />
//     </li>
//   ))}
// </ul>

// ====================================================

// <div ref={containerRef} className={css.scrollableContainer}>
//   <ul className={css.listTeachers}>
//     {displayedTeachers.map(teacher => (
//       <li key={teacher.id}>
//         <Teacher id={teacher.id} filterLevel={filterLevel} />
//       </li>
//     ))}
//   </ul>
// </div>
