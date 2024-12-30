import { useDispatch, useSelector } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect } from 'react';
import {
  fetchFavoriteTeachers,
  fetchTeacherForId,
  fetchTeachersThunc,
} from '../../redux/teachers/operations';
import css from './Teachers.module.css';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { TeacherFilterForm } from '../../components/TeacherFilterForm/TeacherFilterForm';
import { selectIsLoading } from '../../redux/teachers/selectors';
// import { Toaster } from 'react-hot-toast';

export const Teachers = () => {
  const userId = useSelector(selectUserID);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
    dispatch(fetchTeacherForId());
    // dispatch(fetchTeachersThunc());
  }, [dispatch, userId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (userId) {
  //       await dispatch(fetchFavoriteTeachers(userId));
  //     }
  //     await dispatch(fetchTeacherForId());
  //     await dispatch(fetchTeachersThunc());
  //   };

  //   fetchData();
  // }, [dispatch, userId]);

  return (
    <div className={css.contTeachersPage}>
      <TeacherFilterForm />
      {/* <TeacherList /> */}
      {loading ? (
        <p>Loading...</p> // или можно заменить на спиннер
      ) : (
        <TeacherList />
      )}
    </div>
  );
};
