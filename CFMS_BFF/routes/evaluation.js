const express = require('express');
const axios = require('axios');
const { getTargetServiceUrl } = require('../utils/serviceDiscovery');
const router = express.Router();

const CO2eEVALUATION_SERVICE_NAME = 'CO2e-Evaluation-CFMS'

// Route evaluation requests to the CO2e_evaluation microservice
router.get('/', async (req, res) => {

    try {
        const serviceUrl = getTargetServiceUrl(CO2eEVALUATION_SERVICE_NAME);
        const response = await axios.get(`${serviceUrl}/evaluations`);

        // Transform the response data
        const transformedData = response.data.map(evaluation => {
            return {
                ...evaluation,
                results: evaluation.results.map(result => {
                    const inbound = parseFloat(result.inboundCO2eEmissionKg.toFixed(2));
                    const outbound = parseFloat(result.outboundCO2eEmissionKg.toFixed(2));
                    const production = parseFloat(result.productionCO2eEmissionKg.toFixed(2));
                    const totalCO2eEmission = parseFloat((inbound + outbound + production).toFixed(2));
                    const CO2eEmissionPerKg = parseFloat(((inbound + outbound + production) / result.quantity).toFixed(2));

                    return {
                        ...result,
                        inboundCO2eEmissionKg: undefined,
                        outboundCO2eEmissionKg: undefined,
                        productionCO2eEmissionKg: undefined,
                        CO2eEmission: {
                            Inbound: inbound,
                            Outbound: outbound,
                            Production: production
                        },
                        totalCO2eEmission,
                        CO2eEmissionPerKg
                    };
                })
            };
        });

        res.status(response.status).json(transformedData);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

router.post('/', async (req, res) => {
    try {
        const serviceUrl = getTargetServiceUrl(CO2eEVALUATION_SERVICE_NAME);
        const response = await axios.post(`${serviceUrl}/evaluations`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status || 500).json(error.response.data);
    }
});

module.exports = router;
