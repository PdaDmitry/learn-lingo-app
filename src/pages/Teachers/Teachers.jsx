import { useDispatch, useSelector } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect, useState } from 'react';
import { fetchFavoriteTeachers, fetchTeacherForId } from '../../redux/teachers/operations';
import css from './Teachers.module.css';
import { selectUserFilters, selectUserID } from '../../redux/auth/selectorsAuth';
import { TeacherFilterForm } from '../../components/TeacherFilterForm/TeacherFilterForm';
import { selectIsLoading, selectMaxPage } from '../../redux/teachers/selectors';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

export const Teachers = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [guestFilterLanguage, setGuestFilterLanguage] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [guestFilterPrice, setGuestFilterPrice] = useState('');
  const userId = useSelector(selectUserID);
  const userFilters = useSelector(selectUserFilters);
  const loading = useSelector(selectIsLoading);
  const maxPage = useSelector(selectMaxPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeacherForId());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    setPage(1);
  }, [userFilters, guestFilterLanguage, filterLevel, guestFilterPrice]);

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

  return (
    <div className={css.contTeachersPage}>
      <TeacherFilterForm
        setGuestFilterLanguage={setGuestFilterLanguage}
        setFilterLevel={setFilterLevel}
        setGuestFilterPrice={setGuestFilterPrice}
      />
      {loading ? <Loader /> : <TeacherList page={page} filterLevel={filterLevel} />}
      {!loading && loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};
