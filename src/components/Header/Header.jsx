import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import css from './Header.module.css';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className={css.contRout}>
      <div className={css.logo} onClick={handleLogoClick}>
        <svg className={css.logoSvg}>
          <use href="/symbol-defs-before-registration.svg#icon-ukraine"></use>
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
        </ul>
      </nav>
      <div className={css.contAuthentication}>
        <button type="button" className={css.btnLogIn}>
          <svg className={css.loginSvg}>
            <use href="/symbol-defs-before-registration.svg#icon-log-in-01"></use>
          </svg>
          Log in
        </button>

        <button type="button" className={css.btnRegistration} onClick={openModal}>
          Registration
        </button>
      </div>

      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm closeModal={closeModal} />
      </ModalWindow>
    </header>
  );
};
