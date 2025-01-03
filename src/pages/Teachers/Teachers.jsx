import { useDispatch, useSelector } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect } from 'react';
import { fetchFavoriteTeachers, fetchTeacherForId } from '../../redux/teachers/operations';
import css from './Teachers.module.css';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { TeacherFilterForm } from '../../components/TeacherFilterForm/TeacherFilterForm';
import { selectIsLoading } from '../../redux/teachers/selectors';
import Loader from '../../components/Loader/Loader';
// import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

export const Teachers = () => {
  const userId = useSelector(selectUserID);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchTeacherForId());
  }, [dispatch]);

  return (
    <div className={css.contTeachersPage}>
      <TeacherFilterForm />
      {loading ? <Loader /> : <TeacherList />}
      {/* <LoadMoreBtn /> */}
    </div>
  );
};
