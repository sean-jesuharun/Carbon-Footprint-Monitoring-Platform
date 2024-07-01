const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const SUPPLY_SERVICE_NAME = 'CO2e-Evaluation-CFMS'

// Route supply requests to the CO2e_evaluation microservice
router.get('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(SUPPLY_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/supplies`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.post('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(SUPPLY_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/supplies`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.delete('/:supplyId/products/:productName', async (req, res, next) => {
    const { supplyId, productName } = req.params;

    try {
        const serviceUrl = getTargetServiceUrl(SUPPLY_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/supplies/${supplyId}/products/${productName}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;
