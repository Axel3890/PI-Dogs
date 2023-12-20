const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperaments } = require('../db'); // Importa los modelos

const API_URL = "https://api.thedogapi.com/v1/breeds";

async function getRaza(req, res) {
    try {
        const idRaza = req.params.idRaza; // Obtiene el ID de la raza desde los parámetros

        const response = await axios.get(API_URL, {
            headers: {
                'x-api-key': API_KEY 
            }
        });

        // Buscar la raza en el arreglo de perros
        const perros = response.data;
        const razaEncontrada = perros.find(perro => perro.id === parseInt(idRaza));

        if (razaEncontrada) {
            const temperamentsAPI = razaEncontrada.temperament ? razaEncontrada.temperament.split(', ') : [];

            const detalleRazaAPI = {
                id: razaEncontrada.id,
                name: razaEncontrada.name,
                height: `${razaEncontrada.height.imperial} (${razaEncontrada.height.metric})`,
                yearsOfLife: razaEncontrada.life_span,
                weight: `${razaEncontrada.weight.imperial} (${razaEncontrada.weight.metric})`,
                image: razaEncontrada.reference_image_id,
                temperaments: temperamentsAPI
            };

            res.status(200).json(detalleRazaAPI);
        } else {
            // Si no se encuentra la raza en el arreglo de perros, buscar en la base de datos
            const razaDB = await Dog.findOne({
                where: { id: idRaza },
                include: [{ model: Temperaments, through: 'DogTemperament' }]
            });

            if (razaDB) {
                const detalleRazaDB = {
                    id: razaDB.id,
                    name: razaDB.name,
                    height: razaDB.height,
                    yearsOfLife: razaDB.yearsOfLife,
                    weight: razaDB.weight,
                    image: razaDB.image,
                    temperaments: razaDB.Temperaments.map(temperament => temperament.name_temperament)
                };

                res.status(200).json(detalleRazaDB);
                console.log("soy detail", detalleRazaDB)
            } else {
                res.status(404).json({ message: "Raza no encontrada en la base de datos" });
            }
        }
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: error.message });
    }
}

module.exports = getRaza;

