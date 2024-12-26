import { IoMdClose } from 'react-icons/io';
import css from './ActionConfirmation.module.css';

export const ActionConfirmation = ({ closeModal, logOut }) => {
  return (
    <div className={css.contAction}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titletext}>Are you sure you want to leave your account?</h1>
      <div className={css.choiceAction}>
        <button type="button" className={css.btnLogout} onClick={logOut}>
          Logout
        </button>

        <button type="button" className={css.btnCancel} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
