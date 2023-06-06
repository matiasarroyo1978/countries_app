import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions/actions';
import styles from './Detail.module.css';
import Footer from '../Footer/Footer';
// Componente de detalle del país
const Detail = () => {
  // Obtiene el parámetro "id" de la URL
  const { id } = useParams();

  // Obtiene la función "dispatch" y el estado "detail" desde Redux
  const dispatch = useDispatch();
  const country = useSelector(state => state.detail);
  // Efecto secundario para obtener el detalle del país al cargar el componente o al cambiar el ID
  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id]);

  return (
    <>
      {/* Título de la página de detalle */}
      <h1 className={styles.title}>Country Detail</h1>
      <div className={styles.card_div}>
        <div className={styles.card}>
          {/* Imagen de la bandera del país */}
          <img className={styles.card_image} src={country.flagImage} alt={`Bandera de ${country.name}`} />
          <div className={styles.card_content}>
            {/* Título del país */}
            <h2 className={styles.detail_title}>{country.name}</h2>
            {/* Información del ID del país */}
            <p className={styles.detail_text}>
              <strong>ID:</strong> <span className={styles.detail_info}></span> {country.id}
            </p>
            {/* Información de la capital del país */}
            <p className={styles.detail_text}>
              <strong>Capital:</strong> <span className={styles.detail_info}></span>{country.capital}
            </p>
            {/* Información del continente del país */}
            <p className={styles.detail_text}>
              <strong>Continente:</strong> <span className={styles.detail_info}></span>{country.continent}
            </p>
            {/* Información de la subregión del país */}
            <p className={styles.detail_text}>
              <strong>Sub-Region:</strong> <span className={styles.detail_info}></span>{country.subregion}
            </p>
            {/* Información del área del país */}
            <p className={styles.detail_text}>
              <strong>Area:</strong> <span className={styles.detail_info}></span>{country.area?.toLocaleString()} km²
            </p>
            {/* Información de la población del país */}
            <p className={styles.detail_text}>
              <strong>Población:</strong> <span className={styles.detail_info}></span>{country.population?.toLocaleString()}
            </p>
          </div>
        </div>
       
      </div>
      <Footer />
    </>
  );
};

export default Detail;

