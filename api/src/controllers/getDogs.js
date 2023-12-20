const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperaments } = require('../db');

// URL de la API de perros
const API_URL = "https://api.thedogapi.com/v1/breeds";

async function getDogs(req, res) {
    try {
        // Hacer la solicitud GET a la API de perros con la clave API
        const responseAPI = await axios.get(API_URL, {
            headers: {
                'x-api-key': API_KEY 
            }
        });

        // Mapear la respuesta de la API
        const apiDogs = responseAPI.data.map(dog => ({
            id: dog.id,
            name: dog.name,
            weight: `${dog.weight.imperial} (${dog.weight.metric})`,
            height: `${dog.height.imperial} (${dog.height.metric})`,
            reference_image_id: dog.reference_image_id,
            life_span: dog.life_span,
            breed_group: dog.breed_group,
            temperament: dog.temperament
        }));

        // Obtener los perros de la base de datos
        const dbDogs = await Dog.findAll({
            include: [Temperaments], 
        });

        // Mapear los perros de la base de datos
        const dbDogsTransformed = dbDogs.map(dog => ({
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            reference_image_id: dog.image,
            life_span: dog.life_span,
            temperament: dog.Temperaments.map(temperament => temperament.name_temperament)
        }));
        console.log("soy el perro de get", dbDogsTransformed)

        const result = [...dbDogsTransformed, ...apiDogs];

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontraron razas de perros en la API ni en la base de datos." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getDogs;

