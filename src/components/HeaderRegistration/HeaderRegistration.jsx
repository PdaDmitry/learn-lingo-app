import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import css from './HeaderRegistration.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
import { clearFavorites } from '../../redux/teachers/teachersSlice';
import { ChangeThemeForm } from '../ChangeThemeForm/ChangeThemeForm';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { selectUserTheme } from '../../redux/auth/selectorsAuth';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const colorDependence = {
  '#F4C550': '#FBE9BA',
  '#9FBAAE': '#CBDED3',
  '#9FB7CE': '#BFD6EA',
  '#E0A39A': '#F2C0BD',
  '#F0AA8D': '#F4C8BA',
};

const iconDependence = {
  '#F4C550': 1,
  '#9FBAAE': 2,
  '#9FB7CE': 3,
  '#E0A39A': 4,
  '#F0AA8D': 5,
};

export const HeaderRegistration = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const userTheme = useSelector(selectUserTheme);

  const dynamicStyles = {
    dinamicBackground: {
      background: colorDependence[userTheme] || '#FBE9BA',
    },
    btnTheme: {
      background: userTheme || '#F4C550',
    },
  };

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearFavorites());
    navigate('/');
  };

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
            {/* <use href="/symbol-defs-log-out.svg#icon-log-out-03"></use> */}
            <use href={`/symbol-defs-log-out.svg#icon-log-out-0${iconDependence[userTheme]}`} />
          </svg>
          Logout
        </button>

        <button
          type="button"
          className={css.btnRegistration}
          onClick={openThemeModal}
          style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
          onMouseEnter={() => setIsHovered(true)} // When the mouse hovers, change the state
          onMouseLeave={() => setIsHovered(false)}
        >
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
