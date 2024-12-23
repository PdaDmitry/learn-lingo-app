import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import css from './HeaderRegistration.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
// import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
// import { useState } from 'react';
// import ModalWindow from '../ModalWindow/ModalWindow';
// import { LogInForm } from '../LogInForm/LogInForm';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const HeaderRegistration = () => {
  const navigate = useNavigate();
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [loginModalOpen, setLoginModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  //   const openModal = () => setIsModalOpen(true);
  //   const closeModal = () => setIsModalOpen(false);

  //   const openLoginModal = () => setLoginModalOpen(true);
  //   const closeLoginModal = () => setLoginModalOpen(false);

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

        <button type="button" className={css.btnRegistration}>
          Change theme
        </button>
      </div>

      {/* <ModalWindow isOpen={loginModalOpen} onClose={closeLoginModal}>
        <LogInForm closeModal={closeLoginModal} />
      </ModalWindow>

      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm closeModal={closeModal} />
      </ModalWindow> */}
    </header>
  );
};
