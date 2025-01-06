import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';
import { Teachers } from '../../pages/Teachers/Teachers';
import { NotFound } from '../../pages/NotFound/NotFound';
import { HomeRegistration } from '../../pages/HomeRegistration/HomeRegistration';
import { HeaderRegistration } from '../HeaderRegistration/HeaderRegistration';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectLoader } from '../../redux/auth/selectorsAuth';
import { Toaster } from 'react-hot-toast';
import { Favorites } from '../../pages/Favorites/Favorites';
// import Loader from '../Loader/Loader';

import css from './App.module.css';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const loading = useSelector(selectLoader);

  // if (loading) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className={css.contApp}>
      {isLoggedIn ? <HeaderRegistration /> : <Header />}
      <Toaster />
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomeRegistration /> : <Home />} />
        <Route path="/teachers" element={<Teachers />} />
        {isLoggedIn && <Route path="/favorites" element={<Favorites />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
