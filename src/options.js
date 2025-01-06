export const languageOptions = [
  { value: '', label: 'Select Language' },
  { value: 'English', label: 'English' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Vietnamese', label: 'Vietnamese' },
];

export const levelOptions = [
  { value: '', label: 'Select Level' },
  { value: 'A1 Beginner', label: 'A1 Beginner' },
  { value: 'A2 Elementary', label: 'A2 Elementary' },
  { value: 'B1 Intermediate', label: 'B1 Intermediate' },
  { value: 'B2 Upper-Intermediate', label: 'B2 Upper-Interme...' },
  { value: 'C1 Advanced', label: 'C1 Advanced' },
  { value: 'C2 Proficient', label: 'C2 Proficient' },
];

export const priceOptions = [
  { value: '', label: 'Select' },
  { value: '10', label: 10 },
  { value: '20', label: 20 },
  { value: '30', label: 30 },
  { value: '40', label: 40 },
  { value: '50', label: 50 },
];

export const customStyles = {
  control: provided => ({
    ...provided,
    borderRadius: '14px', // Округление углов у контейнера
    height: '48px',
    // width: '198px',
    paddingLeft: '10px',
    paddingRight: '2px',
    margin: '0',
    color: '#121417', // Цвет текста
    backgroundColor: '#fff', // Белый фон
    border: 'none', // Убираем рамку по умолчанию
    outline: 'none', // Убираем outline
    boxShadow: 'none', // Убираем тень при фокусе
    ':focus': {
      border: 'none', // Убираем рамку при фокусе
      outline: 'none', // Убираем outline при фокусе
      boxShadow: 'none', // Убираем тень при фокусе
      color: '#121417',
    },
    ':active': {
      border: 'none', // Убираем рамку при активации
      boxShadow: 'none', // Убираем тень при активации
      color: '#121417',
    },
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '14px', // Округление углов у выпадающего меню
    padding: '14px 0 14px 10px', // Отступы вокруг всего списка
    border: 'none',
    boxShadow: 'none',
    zIndex: '1900',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#121417' : 'rgba(18, 20, 23, 0.2)',
    ':active': {
      backgroundColor: 'transparent', // Убираем цвет фона при активации
    },
    ':focus': {
      backgroundColor: 'transparent', // Убираем цвет фона при фокусе
    },
    fontWeight: '500',
    fontSize: '18px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none', // Скрыть вертикальный слэш
  }),
};
