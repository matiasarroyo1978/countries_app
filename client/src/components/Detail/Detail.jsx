import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions/actions';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id]);

  return (
    <>
      <h1 className={styles.title}>Country Detail</h1>
      <div className={styles.card_div}>
        <div className={styles.card}>
          <img className={styles.card_image} src={country.flagImage} alt={`Bandera de ${country.name}`} />
          <div className={styles.card_content}>
            <h2 className={styles.detail_title}>{country.name}</h2>
            <p className={styles.detail_text}>
              <strong>ID:</strong> <span className={styles.detail_info}></span> {country.id}
            </p>
            <p className={styles.detail_text}>
              <strong>Capital:</strong> <span className={styles.detail_info}></span>{country.capital}
            </p>
            <p className={styles.detail_text}>
              <strong>Continente:</strong> <span className={styles.detail_info}></span>{country.continent}
            </p>
            <p className={styles.detail_text}>
              <strong>Sub-Region:</strong> <span className={styles.detail_info}></span>{country.subregion}
            </p>
            <p className={styles.detail_text}>
              <strong>Area:</strong> <span className={styles.detail_info}></span>{country.area?.toLocaleString()} km²
            </p>
            <p className={styles.detail_text}>
              <strong>Población:</strong> <span className={styles.detail_info}></span>{country.population?.toLocaleString()}
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;

