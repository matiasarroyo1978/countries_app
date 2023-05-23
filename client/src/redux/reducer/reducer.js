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
  ORDER_POPULATION_DESC,
} from '../actions/types';

const initialState = {
  countries: [],               // Lista de todos los países
  filteredCountries: [],      // Lista de países filtrados
  detail: "",                  // Detalles de un país específico
  order: "Abc",                // Orden de la lista de países ("Abc" por defecto)
  continentFilter: "",         // Filtro por continente de los países
  activities: [],              // Lista de actividades
  selectedActivity: "",        // Actividad seleccionada
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case SEARCH_COUNTRY:
      return {
        ...state,
        filteredCountries: action.payload,
      };
    case RESET_FILTERED_COUNTRIES:
      return {
        ...state,
        filteredCountries: state.countries,
      };
    case ORDER_COUNTRIES:
      let sortedCountries = [];
      if (state.continentFilter) {
        // Si hay un filtro por continente, se ordenan los países filtrados
        sortedCountries =
          action.payload === "Abc"
            ? [...state.filteredCountries].sort((a, b) => a.name.localeCompare(b.name))
            : [...state.filteredCountries].sort((a, b) => b.name.localeCompare(a.name));
      } else {
        // Si no hay filtro por continente, se ordenan todos los países
        sortedCountries =
          action.payload === "Abc"
            ? [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
            : [...state.countries].sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filteredCountries: sortedCountries,
        order: action.payload,
      };
    case ORDER_POPULATION_ASC:
      let sortedCountriesAsc = [];
      if (state.continentFilter) {
        // Si hay un filtro por continente, se ordenan los países filtrados por población ascendente
        sortedCountriesAsc = [...state.filteredCountries].sort((a, b) => a.population - b.population);
      } else {
        // Si no hay filtro por continente, se ordenan todos los países por población ascendente
        sortedCountriesAsc = [...state.countries].sort((a, b) => a.population - b.population);
      }
      return {
        ...state,
        filteredCountries: sortedCountriesAsc,
        order: 'PopulationAsc',
      };
    case ORDER_POPULATION_DESC:
      let sortedCountriesDesc = [];
      if (state.continentFilter) {
        // Si hay un filtro por continente, se ordenan los países filtrados por población descendente
        sortedCountriesDesc = [...state.filteredCountries].sort((a, b) => b.population - a.population);
      } else {
        // Si no hay filtro por continente, se ordenan todos los países por población descendente
        sortedCountriesDesc = [...state.countries].sort((a, b) => b.population - a.population);
      }
      return {
        ...state,
        filteredCountries: sortedCountriesDesc,
        order: 'PopulationDesc',
      };
    case FILTER_BY_CONTINENT:
      const filteredByContinent = action.payload
        ? state.countries.filter((c) => c.continent === action.payload)
        : state.countries;
      return {
        ...state,
        filteredCountries: filteredByContinent,
        continentFilter: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case SET_SELECTED_ACTIVITY:
      const selectedActivity = action.payload
        ? [...(state.activities.find((c) => c.name === action.payload).countries)]
        : state.countries;
      return {
        ...state,
        filteredCountries: selectedActivity,
        selectedActivity: action.payload,
      };
    default:
      return state;
  }
};

export default countriesReducer;

