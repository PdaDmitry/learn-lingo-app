import { useDispatch, useSelector } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect, useState } from 'react';
import { fetchFavoriteTeachers, fetchTeacherForId } from '../../redux/teachers/operations';
import css from './Teachers.module.css';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { TeacherFilterForm } from '../../components/TeacherFilterForm/TeacherFilterForm';
import { selectIsLoading, selectMaxPage, selectTotal } from '../../redux/teachers/selectors';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

export const Teachers = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const userId = useSelector(selectUserID);
  const loading = useSelector(selectIsLoading);
  const maxPage = useSelector(selectMaxPage);
  const totalTeachers = useSelector(selectTotal);
  //попробовать добавить изменения фильтров для сброса page setPage(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    setPage(1);
  }, [maxPage, totalTeachers]);

  const handleLoadMore = () => {
    if (page < maxPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page >= maxPage) {
      setLoadMore(false);
    } else {
      setLoadMore(true);
    }
  }, [page, maxPage]);

  // useEffect(() => {
  //   dispatch(fetchTeacherForId());
  // }, [dispatch]);

  return (
    <div className={css.contTeachersPage}>
      <TeacherFilterForm />
      {loading ? <Loader /> : <TeacherList page={page} />}
      {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};
