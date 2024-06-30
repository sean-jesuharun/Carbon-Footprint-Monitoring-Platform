const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandling');
// Routes for different microservices
const vehicleRoutes = require('./vehicle');
const vendorRoutes = require('./vendor');
const customerRoutes = require('./customer');
const supplyRoutes = require('./supply');
const evaluationRoutes = require('./evaluation');

// Middleware to verify token for all routes in backend.js
router.use(verifyToken);

// Define sub-routes
router.use('/vehicles', vehicleRoutes);
router.use('/vendors', vendorRoutes);
router.use('/customers', customerRoutes);
router.use('/supplies', supplyRoutes);
router.use('/evaluations', evaluationRoutes);

// Error handling middleware
router.use(errorHandler)

module.exports = router;
