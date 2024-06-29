const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const SUPPLY_SERVICE_NAME = 'CO2e-Evaluation-CFMS'

// Route supply requests to the CO2e_evaluation microservice
router.get('/', async (req, res) => {
    try {
        const serviceUrl = getTargetServiceUrl(SUPPLY_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/supplies`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.post('/', async (req, res) => {
    try {
        const serviceUrl = getTargetServiceUrl(SUPPLY_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/supplies`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

module.exports = router;
