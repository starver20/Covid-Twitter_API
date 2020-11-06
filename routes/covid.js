const express = require('express');

const router = express.Router();

const covidController = require('../controllers/covid');

router.get('/name/:name', covidController.getName);
router.get('/code/:code', covidController.getCode);
router.get('/search',covidController.getSearch);

module.exports = router;