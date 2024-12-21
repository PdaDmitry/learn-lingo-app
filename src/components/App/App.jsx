import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';
import { Teachers } from '../../pages/Teachers/Teachers';
import { HomeRegistration } from '../../pages/HomeRegistration/HomeRegistration';

// import css from './App.module.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<HomeRegistration />} /> */}
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </div>
  );
}

export default App;
