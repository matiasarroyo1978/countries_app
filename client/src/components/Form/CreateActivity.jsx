import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getCountries } from '../../redux/actions/actions';
import { NavBar } from '../NavBar/NavBar';
import styles from './CreateActivity.module.css';
import { useHistory } from 'react-router-dom';


const CreateActivity = ({ showNavBar }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activityData, setActivityData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = parseInt(value);
    if (name === 'difficulty' && (parsedValue < 1 || parsedValue > 5)) {
      alert('Difficulty must be between 1 and 5');
      return;
    }
    if (name === 'duration' && (parsedValue < 1 || parsedValue > 24)) {
      alert('Duration must be between 1 and 24 hours');
      return;
    }
    setActivityData({ ...activityData, [name]: value });
  };


  const handleInputChangeName = (event) => {
    const { name, value } = event.target;
    if (/^\s/.test(value)) return alert('Value cannot start with white space');
    if (value.length > 50) return alert('Cannot contain more than 50 characters');
    if (value.length > 0 && /^[a-zA-Z0-9\s]+$/.test(value) === false) return alert('Cannot contain special characters');
    setActivityData({ ...activityData, [name]: value });
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleAddCountry = () => {
    if (selectedCountry !== "") {
      if (!activityData.countries.includes(selectedCountry)) {
        setActivityData({
          ...activityData,
          countries: [...activityData.countries, selectedCountry],
        });
        setSelectedCountry("");
      } else {
        alert(`"${selectedCountry}" is already selected!`);
        setSelectedCountry("");
      }
    } else {
      alert("Please select at least one country!");
    }
  };

  const handleRemoveCountry = (country) => {
    setActivityData({
      ...activityData,
      countries: activityData.countries.filter((c) => c !== country),
    });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Verificar si la actividad ya existe en cualquier país
  const existingActivity = activities.find(a => a.name === activityData.name);
  console.log(existingActivity)
  if (existingActivity) {
    // Verificar si la actividad ya existe en el país seleccionado
    const existingActivityInCountry = activities.find(a => a.name === activityData.name && a.countries === activityData.countries.name);
    console.log(existingActivityInCountry)
    if (existingActivityInCountry) {
      alert(`An activity with the name "${activityData.name}" already exists in this country. Please choose a different name or country.`);
      return;
    }
  }
    if (activityData.countries.length === 0) {
      alert('Please select at least one country!');
      return;
    }
    if (activityData.name.length < 3) {
      alert('The name must be greater than or equal to 3 characters');
      return;
    }


    dispatch(createActivity(activityData));
    setActivityData({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: []
    });
    alert('Activity created')
    history.push('/home')
  };




  return (
    <div >
      <div>
        <h1 className={styles.h1_titel}>Activity Creation</h1>
      </div>
      {showNavBar && <NavBar />}
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="name">Name of the Activity:</label>
          <input className={styles.input} type="text" id="name" name="name" value={activityData.name} onChange={handleInputChangeName} required />
        </div>
        <div>
          <label className={styles.label} htmlFor="difficulty">Difficulty:</label>
          <input
            type="number"
            name="difficulty"
            value={activityData.difficulty}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="duration">Duration(Hours):</label>
          <input
            type="number"
            name="duration"
            value={activityData.duration}
            onChange={handleInputChange}
            min="1"
            max="24"
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="season">Season:</label>
          <select className={styles.select} id="season" name="season" value={activityData.season} onChange={handleInputChange} required>
            <option value=""></option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
        </div>
        <div>
          <label className={styles.label} htmlFor="countries">
            Countries:
          </label>
          <select
            className={styles.select}
            id="countries"
            name="countries"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.id} - {country.name}
              </option>
            ))}
          </select>
          <button className={styles.button} type="button" onClick={handleAddCountry}>
            Add
          </button>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="selectedCountries">
            Selected Countries:
          </label>
          <ul className={styles.ul} id="selectedCountries">
            {activityData.countries.map((country) => (
              <li className={styles.li} key={country}>
                {country}
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveCountry(country)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.button} type="submit">Create Activity</button>
      </form>
    </div>
  );
}


export default CreateActivity;