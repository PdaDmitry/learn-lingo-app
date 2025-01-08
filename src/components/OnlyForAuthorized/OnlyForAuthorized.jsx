import { useState } from 'react';
import { LogInForm } from '../LogInForm/LogInForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { IoMdClose } from 'react-icons/io';
import css from './OnlyForAuthorized.module.css';

export const OnlyForAuthorized = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsModalOpen(true);
    closeModal();
  };

  const closeRegisteModal = () => setIsModalOpen(false);

  const openLoginModal = () => setLoginModalOpen(true);

  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <div className={css.contAuthForm}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titletext}>This functionality is available only to authorized users!</h1>
      <div className={css.contAuthentication}>
        <button type="button" className={css.btnLogInForm} onClick={openLoginModal}>
          Log in
        </button>

        <button type="button" className={css.btnRegistrationForm} onClick={openRegisterModal}>
          Registration
        </button>
      </div>

      <ModalWindow isOpen={loginModalOpen} onClose={closeLoginModal}>
        <LogInForm closeModal={closeLoginModal} />
      </ModalWindow>

      <ModalWindow isOpen={isModalOpen} onClose={closeRegisteModal}>
        <RegistrationForm closeModal={closeRegisteModal} />
      </ModalWindow>
    </div>
  );
};
