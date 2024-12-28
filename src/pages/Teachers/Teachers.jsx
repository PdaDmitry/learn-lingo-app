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
// import { Toaster } from 'react-hot-toast';

export const Teachers = () => {
  const userId = useSelector(selectUserID);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteTeachers(userId));
    }
    dispatch(fetchTeachersThunc());
    dispatch(fetchTeacherForId());
  }, [dispatch, userId]);

  return (
    <div className={css.contTeachersPage}>
      <TeacherFilterForm />
      <TeacherList />
    </div>
  );
};
