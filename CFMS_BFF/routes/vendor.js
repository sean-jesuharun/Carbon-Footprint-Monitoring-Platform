const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const VENDOR_SERVICE_NAME = 'Vendor-Service-CFMS'

// Route vendors requests to the vendor microservice
router.get('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vendors`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.post('/', async (req, res, next) => {
    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/vendors`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.get('/:vendorId', async (req, res, next) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vendors/${vendorId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.patch('/:vendorId', async (req, res, next) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.patch(`${serviceUrl}/vendors/${vendorId}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.delete('/:vendorId', async (req, res, next) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/vendors/${vendorId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.post('/:vendorId/products', async (req, res, next) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/vendors/${vendorId}/products`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

router.delete('/:vendorId/products/:productName', async (req, res, next) => {
    const { vendorId, productName } = req.params;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/vendors/${vendorId}/products/${productName}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;
