import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import css from './HeaderRegistration.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operationsAuth';
import { clearFavorites } from '../../redux/teachers/teachersSlice';
import { ChangeThemeForm } from '../ChangeThemeForm/ChangeThemeForm';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { selectIsLoggedIn, selectUserTheme } from '../../redux/auth/selectorsAuth';
import { ActionConfirmation } from '../ActionConfirmation/ActionConfirmation';
import { colorDependence, iconDependence } from '../../options';
import { LogInForm } from '../LogInForm/LogInForm';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const HeaderRegistration = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userTheme = useSelector(selectUserTheme);
  const navigate = useNavigate();

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

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openModal = e => {
    e.target.blur();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const openThemeModal = () => setThemeModalOpen(true);
  const closeThemeModal = () => setThemeModalOpen(false);

  const openActionConfirm = () => setActionConfirm(true);
  const closeActionConfirm = () => setActionConfirm(false);

  return (
    <header className={css.contRout}>
      <div className={css.logo} onClick={handleLogoClick}>
        {isLoggedIn ? (
          <svg className={css.logoSvg}>
            <use href="/symbol-defs-flag.svg#icon-ukraine"></use>
          </svg>
        ) : (
          <svg className={css.logoSvg}>
            <use href="/symbol-defs-before-registration.svg#icon-ukraine"></use>
          </svg>
        )}
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
          <li className={isLoggedIn ? css.contLiFavorites : css.hidden}>
            <NavLink to="/favorites" className={buildLinkClass}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={css.contAuthentication}>
        {isLoggedIn ? (
          <button type="button" className={css.btnLogOut} onClick={openActionConfirm}>
            <svg className={css.loginSvg}>
              <use
                href={
                  userTheme
                    ? `/symbol-defs-log-out.svg#icon-log-out-0${iconDependence[userTheme]}`
                    : '/symbol-defs-log-out.svg#icon-log-out-01'
                }
              />
            </svg>
            Logout
          </button>
        ) : (
          <button type="button" className={css.btnLogIn} onClick={openLoginModal}>
            <svg className={css.loginSvg}>
              <use href="/symbol-defs-before-registration.svg#icon-log-in-01"></use>
            </svg>
            Log in
          </button>
        )}

        {isLoggedIn ? (
          <button
            type="button"
            className={css.btnChangeTheme}
            onClick={openThemeModal}
            style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
            onMouseEnter={() => setIsHovered(true)} // When the mouse hovers, change the state
            onMouseLeave={() => setIsHovered(false)}
          >
            Change theme
          </button>
        ) : (
          <button type="button" className={css.btnRegistration} onClick={openModal}>
            Registration
          </button>
        )}
      </div>

      <ModalWindow isOpen={loginModalOpen} onClose={closeLoginModal}>
        <LogInForm closeModal={closeLoginModal} />
      </ModalWindow>

      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <RegistrationForm closeModal={closeModal} />
      </ModalWindow>

      <ModalWindow isOpen={themeModalOpen} onClose={closeThemeModal}>
        <ChangeThemeForm closeModal={closeThemeModal} />
      </ModalWindow>

      <ModalWindow isOpen={actionConfirm} onClose={closeActionConfirm}>
        <ActionConfirmation closeModal={closeActionConfirm} logOut={handleLogout} />
      </ModalWindow>
    </header>
  );
};
