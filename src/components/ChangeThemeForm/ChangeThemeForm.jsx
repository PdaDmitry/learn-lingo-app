import { IoMdClose } from 'react-icons/io';
import { MdOutlineRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import css from './ChangeThemeForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID } from '../../redux/auth/selectorsAuth';
import { updateTheme } from '../../redux/auth/operationsAuth';

export const ChangeThemeForm = ({ closeModal }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const userId = useSelector(selectUserID);

  const dispatch = useDispatch();

  const themes = [
    { value: '#F4C550', label: 'Golden Yellow (base)' },
    { value: '#9FBAAE', label: 'Muted Sage Green' },
    { value: '#9FB7CE', label: 'Pale Steel Blue' },
    { value: '#E0A39A', label: 'Blush Coral' },
    { value: '#F0AA8D', label: 'Peach Orange' },
  ];

  const handleSubmit = event => {
    event.preventDefault();
    // console.log({ userId, selectedTheme });
    dispatch(updateTheme({ userId, theme: selectedTheme }));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className={css.contChangeTheme}>
      <button type="button" className={css.closeButton} onClick={closeModal} aria-label="Close">
        <IoMdClose style={{ width: '32px', height: '32px' }} />
      </button>
      <h1 className={css.titleText}>Change theme</h1>

      <ul className={css.radioGroup}>
        {themes.map(theme => (
          <li key={theme.value} className={css.radioOption}>
            <input
              type="radio"
              id={theme.value}
              value={theme.value}
              checked={selectedTheme === theme.value}
              onChange={() => setSelectedTheme(theme.value)}
              className={css.radioInput}
              required
            />
            <label htmlFor={theme.value} className={css.radioLabel}>
              {selectedTheme === theme.value ? (
                <MdOutlineRadioButtonChecked
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                    fill: theme.value,
                  }}
                />
              ) : (
                <MdRadioButtonUnchecked
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '8px',
                    color: theme.value,
                  }}
                />
              )}
              <p className={css.textRadio}>{theme.label}</p>
            </label>
          </li>
        ))}
      </ul>

      <button type="submit" className={css.btnChangeTheme} disabled={!selectedTheme}>
        Change theme
      </button>
    </form>
  );
};
