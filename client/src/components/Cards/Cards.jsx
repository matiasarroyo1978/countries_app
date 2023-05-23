import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import styles from './Cards.module.css';

// Componente de React llamado "Cards"
const Cards = () => {

  // Accede al estado de Redux y obtiene la lista de países filtrados
  const filteredCountries = useSelector(state => state.filteredCountries);

  // Estado local para la página actual y el número total de elementos
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Cantidad de elementos a mostrar por página
  const perPage = 10;

  // Efecto secundario que se ejecuta cuando cambia la lista de países filtrados
  useEffect(() => {
    // Actualiza el número total de elementos con la longitud de la lista de países filtrados
    setTotalItems(Object.values(filteredCountries).length);
    // Establece la página actual en 1
    setCurrentPage(1);
  }, [filteredCountries]);

  // Efecto secundario que se ejecuta cuando la lista de países filtrados está vacía
  useEffect(() => {
    if (filteredCountries.length === 0) {
      // Si la lista está vacía, establece la página actual en 1
      setCurrentPage(1);
    }
  }, [filteredCountries]);

  // Función para cambiar la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Cálculo de los índices del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;

  // Obtiene una porción de la lista de países filtrados para la página actual
  const currentItems = Object.values(filteredCountries).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* Contenedor de las tarjetas de países */}
      <div className={styles.card_container}>
        {/* Mapea la lista de países actuales y renderiza un componente "Card" para cada uno */}
        {currentItems.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flagImage={country.flagImage}
            continent={country.continent}
          />
        ))}
      </div>
      {/* Componente "Pagination" para la paginación de los elementos */}
      <Pagination perPage={perPage} totalItems={totalItems} currentPage={currentPage} paginate={paginate} />
    </>
  );
};

export default Cards;

