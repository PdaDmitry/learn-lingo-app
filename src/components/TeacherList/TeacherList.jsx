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

  // console.log('teachers:', teachers);
  // useEffect(() => {
  //   // console.log('Effect 1');

  //   console.log('totalTeachers: ', totalTeachers);
  //   console.log('maxPage: ', maxPage);
  //   console.log('page: ', page);
  //   console.log('\n');
  // }, [totalTeachers, maxPage, page]);

  if (teachers.length === 0) {
    return <p>No teachers available</p>;
  }

  useEffect(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    if (page === 1) {
      setDisplayedTeachers(teachers.slice(startIndex, endIndex));
    } else {
      setDisplayedTeachers(prev => [...prev, ...teachers.slice(startIndex, endIndex)]);
    }
  }, [page, teachers]);

  useEffect(() => {
    if (lastTeacherRef.current) {
      lastTeacherRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollBy({ top: 202, behavior: 'smooth' });
  }, [displayedTeachers]);

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
