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
  countries: [],
  filteredCountries: [],
  detail: "",
  order: "Abc",
  continentFilter: "",
  activities: [],
  selectedActivity: "",
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
        sortedCountries =
          action.payload === "Abc"
            ? [...state.filteredCountries].sort((a, b) => a.name.localeCompare(b.name))
            : [...state.filteredCountries].sort((a, b) => b.name.localeCompare(a.name));
      } else {
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
        sortedCountriesAsc = [...state.filteredCountries].sort((a, b) => a.population - b.population);
      } else {
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
        sortedCountriesDesc = [...state.filteredCountries].sort((a, b) => b.population - a.population);
      } else {
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
