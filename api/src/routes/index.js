const { Router } = require('express');
const countryController = require('../controllers/countryController');
const activityController = require('../controllers/activityController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Endpoint para obtener todos los países
router.get('/countries/', countryController.getAll);

// Endpoint para obtener los detalles de un país por su ID
router.get('/countries/:idPais', countryController.getCountryDetails);

// Endpoint para buscar países por su nombre
router.get('/countries/name/:name', countryController.getCountryByName);

// Endpoint para crear una actividad turística y relacionarla con los países indicados
router.post('/activities', activityController.createActivity);

// Endpoint para obtener todas las actividades turísticas
router.get('/activities', activityController.getActivities);
// Endpoint para eliminar una actividad turística
router.delete('/activities/:id', activityController.deleteActivity);
// Endpoint para modificar actividad turística
router.put('/activities/:id', activityController.modifyActivity);
// Llamar la función fetchAndSaveCountries al levantar el servidor
countryController.saveCountries();

module.exports = router;

