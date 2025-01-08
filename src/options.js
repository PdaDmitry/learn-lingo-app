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
    borderRadius: '14px',
    height: '48px',
    paddingLeft: '10px',
    paddingRight: '2px',
    margin: '0',
    color: '#121417',
    backgroundColor: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    ':focus': {
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
    ':active': {
      border: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '14px',
    padding: '14px 0 14px 10px',
    border: 'none',
    boxShadow: 'none',
    zIndex: '1900',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#121417' : 'rgba(18, 20, 23, 0.2)',
    ':active': {
      backgroundColor: 'transparent',
    },
    ':focus': {
      backgroundColor: 'transparent',
    },
    fontWeight: '500',
    fontSize: '18px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export const colorDependence = {
  '#F4C550': '#FBE9BA',
  '#9FBAAE': '#CBDED3',
  '#9FB7CE': '#BFD6EA',
  '#E0A39A': '#F2C0BD',
  '#F0AA8D': '#F4C8BA',
};

export const iconDependence = {
  '#F4C550': 1,
  '#9FBAAE': 2,
  '#9FB7CE': 3,
  '#E0A39A': 4,
  '#F0AA8D': 5,
};
