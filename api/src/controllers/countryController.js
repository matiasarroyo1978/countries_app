const axios = require('axios');
const { Country } = require('../db');
const { Op } = require("sequelize");
//const data = require('../../data.json')

// Función para mapear los datos del país recibido desde la API
const mapCountry = (country) => ({
  id: country.cca3,
  name: country.name.common || "N/A",
  flagImage: country.flags?.[0] || "N/A",
  continent: country.region || "N/A",
  capital: country.capital?.[0] || "N/A",
  subregion: country.subregion || "N/A",
  area: country.area,
  population: country.population,
});

// Función para guardar los países en la base de datos
const saveCountries = async () => {
  try {
    // Se realiza una solicitud a la API para obtener los datos de los países
    const response = await axios.get('https://rest-countries.up.railway.app/v3/all');
    // Se mapean los datos de los países
    const countries = response.data.map(mapCountry);
    // Se utiliza el método bulkCreate de Sequelize para guardar los países en la base de datos
    const result = await Country.bulkCreate(countries, { ignoreDuplicates: true });
    console.log('Countries saved from api:', result.length);
  } catch (error) {
    console.error('Error while fetching and saving countries:', error);
  }
};

// Función para obtener los detalles de un país por su ID
const getCountryDetails = async (req, res) => {
  const { idPais } = req.params;

  try {
    // Se busca el país en la base de datos por su ID
    const country = await Country.findOne({
      where: {
        id: {
          [Op.iLike]: idPais,
        },
      },
    });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get country' });
  }
};

// Función para buscar un país por su nombre
const getCountryByName = async (req, res) => {
  const { name } = req.params;
  console.log("Name received from params:", name);
  try {
    // Se busca el país en la base de datos por su nombre
    const country = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: '%'+name+'%',
        },
      },
    });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.json(country);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error when searching for the country' });
  }
};

// Función para obtener todos los países de la base de datos
const getAll = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting countries' });
  }
};

module.exports = {
  saveCountries,
  getCountryDetails,
  getCountryByName,
  getAll,
};



