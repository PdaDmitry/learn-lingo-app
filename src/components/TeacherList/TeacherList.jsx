import { useSelector } from 'react-redux';
import { selectTeachers } from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';

export const TeacherList = () => {
  const teachers = useSelector(selectTeachers);

  // console.log(teachers);

  if (!teachers.length) {
    return <div>No teachers available</div>;
  }

  return (
    <ul>
      {teachers.map(teacher => (
        <li key={teacher.id}>
          <Teacher id={teacher.id} />
        </li>
      ))}
    </ul>
  );
};
