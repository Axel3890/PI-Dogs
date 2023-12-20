const axios = require('axios');
const { API_KEY } = process.env;
const { Temperaments } = require('../db');

const URL = "https://api.thedogapi.com/v1/breeds";

async function getTemp(req, res) {
  try {

    const response = await axios.get(URL, {
      headers: {
        'x-api-key': API_KEY 
      }
    });


    const temperamentsSet = new Set();

    // Extraer los temperamentos de todas las razas y agregarlos al conjunto
    response.data.forEach(breed => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(', ');
        breedTemperaments.forEach(temperament => {
          temperamentsSet.add(temperament.trim()); // trim para eliminar espacios en blanco
        });
      }
    });


    const temperamentsArray = [...temperamentsSet];


    for (const temperamentName of temperamentsArray) {
      await Temperaments.findOrCreate({ where: { name_temperament: temperamentName } });
    }

    // Obtener los temperamentos desde la base de datos
    const temperamentsFromDB = await Temperaments.findAll({
      attributes: ['name_temperament'], 
    });

    const temperamentsNames = temperamentsFromDB.map(temperament => temperament.name_temperament);

    res.status(200).json({ temperaments: temperamentsNames });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los temperamentos.' });
  }
}

module.exports = getTemp;
