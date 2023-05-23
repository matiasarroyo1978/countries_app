import axios from 'axios';
import {
  GET_ALL_COUNTRIES,
  GET_DETAIL,
  SEARCH_COUNTRY,
  RESET_FILTERED_COUNTRIES,
  ORDER_COUNTRIES,
  FILTER_BY_CONTINENT,
  CREATE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  SET_SELECTED_ACTIVITY,
  ORDER_POPULATION_ASC,
  ORDER_POPULATION_DESC
} from './types';

const BASE_URL = "http://localhost:3001";

// Acción para obtener todos los países desde la API
export function getCountries() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BASE_URL}/countries`)
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    };
  };
};

// Acción para obtener los detalles de un país específico mediante su ID
export const getDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/countries/${id}`);
    dispatch({
      type: GET_DETAIL,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

// Acción para buscar países por un término de búsqueda
export const searchCountry = (searchTerm) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/countries/name/${searchTerm}`);
    const data = response.data;
    if (data.length === 0) {
      alert(`The Search Term "${searchTerm}" does not relate to any country`);
    } else {
      dispatch({
        type: SEARCH_COUNTRY,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Acción para restablecer los países filtrados y mostrar todos los países
export const resetFilteredCountries = () => {
  return {
    type: RESET_FILTERED_COUNTRIES,
  };
};

// Acción para ordenar los países según un criterio de orden especificado
export const orderCountries = (order) => ({
  type: ORDER_COUNTRIES,
  payload: order
});

// Acción para ordenar los países por población de forma ascendente
export const orderPopulationAsc = () => ({
  type: ORDER_POPULATION_ASC,
});

// Acción para ordenar los países por población de forma descendente
export const orderPopulationDesc = () => ({
  type: ORDER_POPULATION_DESC,
});

// Acción para filtrar los países por continente
export const filterByContinent = (continent) => {
  const payload = continent === "ALL" ? null : continent;
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};

// Acción para crear una nueva actividad
export const createActivity = (activityData) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/activities`, activityData)
    dispatch({ type: CREATE_ACTIVITY, payload: res.data })
  } catch (error) {
    console.error(error)
  }
};

// Acción para obtener todas las actividades desde la API
export const getAllActivities = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/activities`);
    const data = response.data;
    dispatch({
      type: GET_ALL_ACTIVITIES,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Acción para establecer una actividad seleccionada
export const filterByActivity = (activity) => ({
  type: SET_SELECTED_ACTIVITY,
  payload: activity,
});


