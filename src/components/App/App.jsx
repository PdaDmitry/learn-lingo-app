import { Route, Routes } from 'react-router-dom';
import { Teachers } from '../../pages/Teachers/Teachers';
import { NotFound } from '../../pages/NotFound/NotFound';
import { HomeRegistration } from '../../pages/HomeRegistration/HomeRegistration';
import { HeaderRegistration } from '../HeaderRegistration/HeaderRegistration';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';
import { Toaster } from 'react-hot-toast';
import { Favorites } from '../../pages/Favorites/Favorites';

import css from './App.module.css';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.contApp}>
      <HeaderRegistration />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeRegistration />} />
        <Route path="/teachers" element={<Teachers />} />
        {isLoggedIn && <Route path="/favorites" element={<Favorites />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
