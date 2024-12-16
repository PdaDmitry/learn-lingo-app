import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';
import { Teachers } from '../../pages/Teachers/Teachers';
// import css from './App.module.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </div>
  );
}

export default App;

// =======================================================================

// import { useState, useEffect } from 'react';
// import { getDatabase, ref, get, child } from 'firebase/database';
// import { app } from '../../../firebase'; // Путь к вашему firebase.js
// import './App.css';

// function App() {
//   const [teachers, setTeachers] = useState([]); // Состояние для данных
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const db = getDatabase(app);
//         const dbRef = ref(db, '/'); // Путь к массиву в корне базы
//         const snapshot = await get(dbRef);

//         if (snapshot.exists()) {
//           setTeachers(snapshot.val()); // Сохраняем массив в состояние
//         } else {
//           console.log('No data available');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="App">
//       <h1>Teachers</h1>
//       <ul>
//         {teachers.map((teacher, index) => (
//           <li key={index}>
//             <img src={teacher.avatar_url} alt={`${teacher.name} avatar`} width="100" />
//             <h2>
//               {teacher.name} {teacher.surname}
//             </h2>
//             <p>Languages: {teacher.languages.join(', ')}</p>
//             <p>Price per hour: ${teacher.price_per_hour}</p>
//             <p>Rating: {teacher.rating}</p>
//             <p>{teacher.lesson_info}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
