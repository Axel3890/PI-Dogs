const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperaments } = require('../db'); 
const { Op } = require('sequelize');

// URL de la API general
const API_BASE_URL = "https://api.thedogapi.com/v1/breeds/search?q=";
const API_URL = API_BASE_URL + "{raza_perro}";

async function getName(req, res) {
    try {

        const { name } = req.query;

        if (!name) {

            return res.status(400).json({ message: "El parámetro name es requerido." });
        }


        const apiUrlWithQuery = API_URL.replace("{raza_perro}", name);

        const responseAPI = await axios.get(apiUrlWithQuery, {
            headers: {
                'x-api-key': API_KEY 
            }
        });

        const apiDogBreeds = responseAPI.data;


        const dbDogBreeds = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [Temperaments]
        });

        const apiDogBreedsTransformed = apiDogBreeds.map(dog => ({
            id: dog.id,
            name: dog.name,
            weight: `${dog.weight.imperial} (${dog.weight.metric})`,
            height: `${dog.height.imperial} (${dog.height.metric})`,
            reference_image_id: dog.reference_image_id,
            life_span: dog.life_span,
            breed_group: dog.breed_group,
            temperament: dog.temperament
        }));

        const result = [...apiDogBreedsTransformed, ...dbDogBreeds];

        if (result.length > 0) {

            res.status(200).json(result);
        } else {

            res.status(404).json({ message: "No se encontraron razas de perros con ese nombre." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getName;




