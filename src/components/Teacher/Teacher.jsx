export const Teacher = ({ teacher, id }) => {
  return (
    <div>
      <h2>Teacher's phono</h2>
      <p>Languages</p>
      <p>Lessons online</p>
      <p>Lessons done: {teacher.lessons_done}</p>
      <p>Rating: {teacher.rating}</p>
      <p>Price / 1 hour: {teacher.price_per_hour}$</p>
      <p>Favorites</p>
      <h2>{`${teacher.name} ${teacher.surname}`}</h2>
      <p>Speaks: {teacher.languages.join(', ')}</p>
      <p>Lesson Info: {teacher.lesson_info}</p>
      <p>Conditions:{teacher.conditions}</p>
      <p>{teacher.lesson_info}</p>
      <button type="button">Read more</button>
      <p>{teacher.levels.join(', ')}</p>
      <p>_______________________________________</p>
    </div>
  );
};
