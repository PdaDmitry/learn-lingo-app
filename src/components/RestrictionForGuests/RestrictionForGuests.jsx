import { IoMdClose } from 'react-icons/io';
import css from './RestrictionForGuests.module.css';

export const RestrictionForGuests = ({ closeModal }) => {
  return (
    <div className={css.contAction}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titletext}>This functionality is available only to authorized users!</h1>

      <button type="button" className={css.btnCancel} onClick={closeModal}>
        Cancel
      </button>
    </div>
  );
};
