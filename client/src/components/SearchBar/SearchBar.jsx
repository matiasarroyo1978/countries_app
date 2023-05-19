import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetFilteredCountries, searchCountry } from '../../redux/actions/actions';
import styles from './SearchBar.module.css';

const SearchBar = ({ show }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  

  const handleSearch = ({ target }) => {
  const input = target.value;
  // Validaciones
  const validLength = input.length <= 50; // Longitud máxima de 50 caracteres
  const validCharacters = /^[a-zA-Z\s]*$/.test(input); // Solo letras y espacios
  const validSpecialCharacters = !/[@$!%*#?&]/.test(input); // No caracteres especiales
  const validNumbers = !/\d/.test(input); // No números
  const validSpaces = !/^\s/.test(input); // No espacios en blanco al inicio

  if (!validLength) {
    alert('No more than 50 characters allowed');
    return;
  }
  if (!validNumbers) {
    alert('Numbers are not allowed');
    return;
  }
  if (!validCharacters) {
    alert('Special characters are not allowed');
    return;
  }
  if (!validSpecialCharacters) {
    alert('Special characters are not allowed');
    return;
  }
  if (!validSpaces) {
    alert('Blank spaces are not allowed at the beginning.');
    return;
  }

  setSearchTerm(input);
  if (input.length === 0) {
    dispatch(resetFilteredCountries());
    return;
  }
  dispatch(searchCountry(input));
};


  if (!show) {
    return null;
  }

  return (
    <div className={styles.input_icon}>
      <input type="text" placeholder="Search country" value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;

