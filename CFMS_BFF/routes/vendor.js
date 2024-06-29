const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const VENDOR_SERVICE_NAME = 'Vendor-Service-CFMS'

// Route vendors requests to the vendor microservice
router.get('/', async (req, res) => {
    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vendors`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.post('/', async (req, res) => {
    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/vendors`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.get('/:vendorId', async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/vendors/${vendorId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.patch('/:vendorId', async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.patch(`${serviceUrl}/vendors/${vendorId}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.delete('/:vendorId', async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/vendors/${vendorId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.post('/:vendorId/products', async (req, res) => {
    const vendorId = req.params.vendorId;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/vendors/${vendorId}/products`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.delete('/:vendorId/products/:productName', async (req, res) => {
    const { vendorId, productName } = req.params;

    try {
        const serviceUrl = getTargetServiceUrl(VENDOR_SERVICE_NAME);
        const response = await axios.delete(`${serviceUrl}/vendors/${vendorId}/products/${productName}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

module.exports = router;
