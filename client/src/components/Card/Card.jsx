import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ id, name, flagImage, continent }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card_image} src={flagImage} alt={`Bandera de ${name}`} />
      <div className={styles.card_content}>
        <Link to={`/detail/${id}`}>
          <h2 className={styles.card_title}>{name}</h2>
        </Link>
        <p className={styles.card_text}>
          <strong>Continent:</strong> {continent}
        </p>
      </div>
    </div>
  );
};

export default Card;
