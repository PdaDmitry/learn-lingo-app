import { useState } from 'react';
import css from './LoadMoreBtn.module.css';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/auth/selectorsAuth';
import { colorDependence } from '../../options';

export default function LoadMoreBtn({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
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
    <div>
      <button
        className={css.btnLoad}
        type="button"
        onClick={onClick}
        style={isHovered ? dynamicStyles.dinamicBackground : dynamicStyles.btnTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Load more
      </button>
    </div>
  );
}
