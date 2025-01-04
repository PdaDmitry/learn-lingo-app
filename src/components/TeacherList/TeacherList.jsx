import { useSelector } from 'react-redux';
import {
  selectMaxPage,
  selectPerPage,
  selectTeachers,
  selectTotal,
} from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './TeacherList.module.css';

export const TeacherList = ({ page }) => {
  const teachers = useSelector(selectTeachers);
  const totalTeachers = useSelector(selectTotal);
  const maxPage = useSelector(selectMaxPage);
  const perPage = useSelector(selectPerPage);

  // console.log('teachers:', teachers);
  console.log('totalTeachers: ', totalTeachers);
  console.log('maxPage: ', maxPage);
  console.log('perPage: ', perPage);
  console.log('page: ', page);

  // const startIndex = (page - 1) * perPage;
  // const endIndex = startIndex + perPage;

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
