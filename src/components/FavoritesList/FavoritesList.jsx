import { useSelector } from 'react-redux';
import { selectFavoriteTeachers } from '../../redux/teachers/selectors';
import { Teacher } from '../Teacher/Teacher';
import css from './FavoritesList.module.css';

export const FavoritesList = () => {
  const favoriteTeachers = useSelector(selectFavoriteTeachers);

  if (!favoriteTeachers.length) {
    return <p className={css.text}>You haven't chosen a single favorite teacher yet...</p>;
  }

  return (
    <ul className={css.favoritesList}>
      {favoriteTeachers.map(teacher => (
        <li key={teacher.id}>
          <Teacher id={teacher.id} />
        </li>
      ))}
    </ul>
  );
};
