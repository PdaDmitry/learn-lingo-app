import { useSelector } from 'react-redux';
import { selectTeachersById } from '../../redux/teachers/selectors';

export const Teacher = ({ id }) => {
  const teacher = useSelector(selectTeachersById(id));

  const {
    lessons_done,
    rating,
    price_per_hour,
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    levels,
  } = teacher;

  return (
    <div>
      <h2>Teachers phono</h2>
      <p>Languages</p>
      <p>Lessons online</p>
      <p>Lessons done: {lessons_done}</p>
      <p>Rating: {rating}</p>
      <p>Price / 1 hour: {price_per_hour}$</p>
      <p>Favorites</p>
      <h2>{`${name} ${surname}`}</h2>
      <p>Speaks: {languages.join(', ')}</p>
      <p>Lesson Info: {lesson_info}</p>
      <p>Conditions:{conditions}</p>

      <button type="button">Read more</button>
      <p>{levels.join(', ')}</p>
      <p>_______________________________________</p>
    </div>
  );
};
