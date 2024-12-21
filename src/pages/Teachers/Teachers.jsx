import { useDispatch } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect } from 'react';
import { fetchTeachersThunc } from '../../redux/teachers/operations';
import css from './Teachers.module.css';
import { Toaster } from 'react-hot-toast';

export const Teachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachersThunc());
  }, [dispatch]);

  return (
    <div className={css.contTeachersPage}>
      <Toaster />
      <TeacherList />
    </div>
  );
};
