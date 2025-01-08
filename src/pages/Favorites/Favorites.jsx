import { useDispatch, useSelector } from 'react-redux';
import { FavoritesList } from '../../components/FavoritesList/FavoritesList';
import css from './Favorites.module.css';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { useEffect } from 'react';
import { fetchFavoriteTeachers } from '../../redux/teachers/operations';

export const Favorites = () => {
  const userId = useSelector(selectUserID);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className={css.contFavoritesTeachers}>
      <FavoritesList />
    </div>
  );
};
