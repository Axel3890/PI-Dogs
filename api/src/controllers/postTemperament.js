const { Temperaments } = require("../db")

async function postTemperaments(req, res) {
    try{
        const { temperament } = req.body

        const newtemp = await Temperaments.create({name_temperament: temperament})



        res.status(201).json(newtemp)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = postTemperaments;