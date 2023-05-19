const axios = require('axios');
const { Country } = require('../db');
const { Op } = require("sequelize");
//const data = require('../../data.json')

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


const saveCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    const countries = response.data.map(mapCountry);
    const result = await Country.bulkCreate(countries, { ignoreDuplicates: true });
    console.log('Countries saved from api:', result.length);
  } catch (error) {
    console.error('Error while fetching and saving countries:', error);
    /* const countries = data.map(mapCountry);
    const result = await Country.bulkCreate(countries, { ignoreDuplicates: true });
    console.log('Countries saved from data.json:', result.length); */
  }
};


const getCountryDetails = async (req, res) => {
  const { idPais } = req.params;

  try {
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
    res.status(500).json({ message: 'Failed to get country' });
  }
};

const getCountryByName = async (req, res) => {
  const { name } = req.params;
  console.log("Name received from params:", name);
  try {
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
    res.status(500).json({ message: 'Error when searching for the country' });
  }
};


const getAll = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting countries' });
  }
};


module.exports = {
  saveCountries,
  getCountryDetails,
  getCountryByName,
  getAll,
};


