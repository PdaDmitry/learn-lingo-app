import { useSelector } from 'react-redux';
import { selectTeachers } from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './TeacherList.module.css';

export const TeacherList = () => {
  const teachers = useSelector(selectTeachers);

  // console.log(teachers);

  if (!teachers.length) {
    return <p>No teachers available</p>;
  }

  return (
    <ul className={css.listTeachers}>
      {teachers.map(teacher => (
        <li key={teacher.id}>
          <Teacher id={teacher.id} />
        </li>
      ))}
    </ul>
  );
};
