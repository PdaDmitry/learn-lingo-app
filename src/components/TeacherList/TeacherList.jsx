import { useSelector } from 'react-redux';
import { selectPerPage, selectTeachers } from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './TeacherList.module.css';
import { useEffect, useRef, useState } from 'react';

export const TeacherList = ({ page, filterLevel }) => {
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  const lastTeacherRef = useRef(null);

  const teachers = useSelector(selectTeachers);
  const perPage = useSelector(selectPerPage);
  const containerRef = useRef(null);

  useEffect(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    if (page === 1) {
      setDisplayedTeachers(teachers.slice(startIndex, endIndex));
    } else {
      setDisplayedTeachers(teachers.slice(0, endIndex));
    }
  }, [page, teachers, perPage]);

  useEffect(() => {
    if (lastTeacherRef.current) {
      lastTeacherRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollBy({ top: 202, behavior: 'smooth' });
  }, [displayedTeachers]);

  if (teachers.length === 0) {
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
