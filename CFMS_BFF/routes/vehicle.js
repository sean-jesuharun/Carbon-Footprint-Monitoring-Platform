const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const VEHICLE_SERVICE_NAME = 'Vehicle-Service-CFMS'

// Route vehicles requests to the vehicles microservice
router.get('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(VEHICLE_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vehicles`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.post('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(VEHICLE_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/vehicles`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.get('/:vehicleId', async (req, res, next) => {
    const vehicleId = req.params.vehicleId;

    try {
        const serviceUrl = getTargetServiceUrl(VEHICLE_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vehicles/${vehicleId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.put('/:vehicleId', async (req, res, next) => {
    const vehicleId = req.params.vehicleId;

    try {
        const serviceUrl = getTargetServiceUrl(VEHICLE_SERVICE_NAME);
        const response = await axios.put(`${serviceUrl}/vehicles/${vehicleId}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.delete('/:vehicleId', async (req, res, next) => {
    const vehicleId = req.params.vehicleId;

    try {
        const serviceUrl = getTargetServiceUrl(VEHICLE_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/vehicles/${vehicleId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;
