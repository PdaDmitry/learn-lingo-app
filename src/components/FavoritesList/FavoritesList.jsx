import { useSelector } from 'react-redux';
import { selectFavoriteTeachers } from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';

export const FavoritesList = () => {
  const favoriteTeachers = useSelector(selectFavoriteTeachers);

  if (!favoriteTeachers.length) {
    return <p>You haven't chosen a single favorite teacher yet...</p>;
  }

  return (
    <ul>
      {favoriteTeachers.map(teacher => (
        <li key={teacher.id}>
          <Teacher id={teacher.id} />
        </li>
      ))}
    </ul>
  );
};
