import { useDispatch } from 'react-redux';
import { TeacherList } from '../../components/TeacherList/TeacherList';
import { useEffect } from 'react';
import { fetchTeachersThunc } from '../../redux/teachers/operations';

export const Teachers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachersThunc());
  }, [dispatch]);

  return (
    <div>
      <h1>Filter!!!</h1>
      <TeacherList />
    </div>
  );
};
