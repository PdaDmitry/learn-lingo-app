import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import css from './HeaderRegistration.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
import { clearFavorites } from '../../redux/teachers/teachersSlice';
import { ChangeThemeForm } from '../ChangeThemeForm/ChangeThemeForm';
import { useState } from 'react';
// import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import ModalWindow from '../ModalWindow/ModalWindow';
// import { LogInForm } from '../LogInForm/LogInForm';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const HeaderRegistration = () => {
  const navigate = useNavigate();
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearFavorites());
    navigate('/');
  };
  //   const openModal = () => setIsModalOpen(true);
  //   const closeModal = () => setIsModalOpen(false);

  const openThemeModal = () => setThemeModalOpen(true);
  const closeThemeModal = () => setThemeModalOpen(false);

  return (
    <header className={css.contRout}>
      <div className={css.logo} onClick={handleLogoClick}>
        <svg className={css.logoSvg}>
          <use href="/symbol-defs-flag.svg#icon-ukraine"></use>
        </svg>
        <p className={css.textLogo}>LearnLingo</p>
      </div>
      <nav>
        <ul className={css.contUl}>
          <li className={css.contLiHome}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={css.contLiTeachers}>
            <NavLink to="/teachers" className={buildLinkClass}>
              Teachers
            </NavLink>
          </li>
          <li className={css.contLiFavorites}>
            <NavLink to="/favorites" className={buildLinkClass}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={css.contAuthentication}>
        <button type="button" className={css.btnLogOut} onClick={handleLogout}>
          <svg className={css.loginSvg}>
            <use href="/symbol-defs-log-out.svg#icon-log-out-01"></use>
          </svg>
          Logout
        </button>

        <button type="button" className={css.btnRegistration} onClick={openThemeModal}>
          Change theme
        </button>
      </div>

      <ModalWindow isOpen={themeModalOpen} onClose={closeThemeModal}>
        <ChangeThemeForm closeModal={closeThemeModal} />
      </ModalWindow>

      {/* <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm closeModal={closeModal} />
      </ModalWindow> */}
    </header>
  );
};
