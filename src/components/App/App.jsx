import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';
import { Teachers } from '../../pages/Teachers/Teachers';
import { TeacherDetails } from '../../pages/TeacherDetails/TeacherDetails';
import { TeacherReviews } from '../TeacherReviews/TeacherReviews';
// import css from './App.module.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/teachers" element={<Teachers />} /> */}
        <Route path="/teachers" element={<Teachers />}>
          <Route path="reviews" element={<TeacherReviews />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
