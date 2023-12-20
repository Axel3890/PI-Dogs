const { Dog, Temperaments } = require('../db');

async function postDogs(req, res) {
    try {
        const { name, life_span, temperaments, image, height, weight } = req.body;
        console.log("soy el post", req.body)


        const newDog = {
            name,
            height,
            weight,
            life_span,
            image,
            temperaments,
        }

        const createdDog = await Dog.create(newDog);

        if (temperaments && temperaments.length > 0) {
            for (const temperamentName of temperaments) {
                const associatedTemperament = await Temperaments.findOne({
                    where: { name_temperament: temperamentName } // Buscar por nombre
                });
                if (associatedTemperament) {
                    await createdDog.addTemperaments(associatedTemperament);
                }
            }
        }

        // Obtener los temperamentos asociados al perro
        const associatedTemperaments = await createdDog.getTemperaments();
        const associatedTemperamentNames = associatedTemperaments.map(temperament => temperament.name_temperament);

        const dogWithTemperaments = {
            id: createdDog.id,
            name: createdDog.name,
            height: createdDog.height,
            yearsOfLife: createdDog.life_span,
            weight: createdDog.weight,
            image: createdDog.image,
            temperaments: associatedTemperamentNames 
        };

        console.log("soy el perro creado", dogWithTemperaments);
        res.status(201).json(dogWithTemperaments);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

module.exports = postDogs;

