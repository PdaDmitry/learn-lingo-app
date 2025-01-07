import { IoMdClose } from 'react-icons/io';
import css from './ActionConfirmation.module.css';
import { selectUserTheme } from '../../redux/auth/selectorsAuth';
import { colorDependence } from '../../options';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const ActionConfirmation = ({ closeModal, logOut }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCancel, setIsHoveredCancel] = useState(false);
  const userTheme = useSelector(selectUserTheme);

  const dynamicStyles = {
    dinamicBackground: {
      background: colorDependence[userTheme] || '#FBE9BA',
    },
    btnTheme: {
      background: userTheme || '#F4C550',
    },
  };

  return (
    <div className={css.contAction}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titletext}>Are you sure you want to leave your account?</h1>
      <div className={css.choiceAction}>
        <button
          type="button"
          className={css.btnLogout}
          onClick={logOut}
          style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
          onMouseEnter={() => setIsHovered(true)} // When the mouse hovers, change the state
          onMouseLeave={() => setIsHovered(false)}
        >
          Logout
        </button>

        <button
          type="button"
          className={css.btnCancel}
          onClick={closeModal}
          style={isHoveredCancel ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
          onMouseEnter={() => setIsHoveredCancel(true)} // When the mouse hovers, change the state
          onMouseLeave={() => setIsHoveredCancel(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
