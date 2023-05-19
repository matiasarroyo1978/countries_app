import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions/actions';
import  Cards  from '../Cards/Cards';
import styles from './HomePage.module.css';


const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])


  return (
    <div className={styles.container}>
      <Cards />
    </div>
  )
}


export default HomePage

