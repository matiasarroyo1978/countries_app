import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { 
  orderCountries, 
  filterByContinent, 
  getAllActivities, 
  filterByActivity, 
  orderPopulationAsc, 
  orderPopulationDesc } from '../../redux/actions/actions';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';
import { useEffect } from 'react';



export const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activities = useSelector(state => state.activities);
  const isDetailPage = location.pathname.startsWith('/detail');
  const isHomePage = location.pathname === '/home';


  const handleSort = (event) => {
    if (event.target.value === 'PopulationAsc') {
      dispatch(orderPopulationAsc());
    } else if (event.target.value === 'PopulationDesc') {
      dispatch(orderPopulationDesc());
    } else {
      dispatch(orderCountries(event.target.value));
    }
  };

  const handleContinentFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
  };

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);


  const handleActivitySelection = (event) => {
    dispatch(filterByActivity(event.target.value));
  };

  return (
    <nav >
      <div className={styles.nav_container}>
      <Link className={styles.button} to='/home'>Home</Link>
        {isHomePage && (
          <SearchBar show={true} />
        )}
        {!isDetailPage && isHomePage && (
          <>
            <div className={styles.order_container}>
              <label >Order:</label>
              <select className={styles.select} onChange={handleSort}>
                <option value='Abc'>A-Z</option>
                <option value='cba'>Z-A</option>
                <option value='PopulationAsc'>Population (asc)</option>
                <option value='PopulationDesc'>Population (desc)</option>
              </select>
              </div>
            <div className={styles.filter_container}>
              <label className={styles.label}>Filter by continent:</label>
              <select className={styles.select} onChange={handleContinentFilter}>
                <option value=''>All</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>America</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
              </select>
            </div>
            <div className={styles.filter_container}>
              <label className={styles.label}>Selec. Tourist Activity:</label>
              <select className={styles.select} onChange={handleActivitySelection}>
                <option value=''>--------</option>
                {activities.map(activity => (
                  <option key={activity.id} value={activity.name}>{activity.name}</option>
                ))}
              </select>
            </div>
          </>
        )}
        {isDetailPage && (
          <SearchBar show={false} />
        )}
        <Link className={styles.button} to='/create'>Create Activity</Link>
        {isDetailPage && (
          <Link className={styles.button} to='/home'>Back</Link>
        )}
        {/* {!isDetailPage && (
          <Link className={styles.button} to='/'>Exit</Link>
        )} */}
      </div>
    </nav>
  );
};
