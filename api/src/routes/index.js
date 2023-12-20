const { Router } = require('express');
const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getDogs, getName, postDogs, getRaza, getTemp, postTemp } = require('../controllers/index');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogs)
router.get("/dogs/name", getName)
router.get("/temperaments", getTemp)
router.post("/dogs", postDogs)
router.get("/dogs/:idRaza", getRaza)
router.post("/posttemperaments", postTemp)


module.exports = router;
