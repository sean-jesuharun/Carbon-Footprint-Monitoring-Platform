const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const CUSTOMER_SERVICE_NAME = 'Customer-Service-CFMS'

// Route vehicles requests to the vehicles microservice
router.get('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(CUSTOMER_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/customers`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.post('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(CUSTOMER_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/customers`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.get('/:customerId', async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        const serviceUrl = getTargetServiceUrl(CUSTOMER_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/customers/${customerId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.put('/:customerId', async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        const serviceUrl = getTargetServiceUrl(CUSTOMER_SERVICE_NAME);
        const response = await axios.put(`${serviceUrl}/customers/${customerId}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.delete('/:customerId', async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        const serviceUrl = getTargetServiceUrl(CUSTOMER_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/customers/${customerId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;
