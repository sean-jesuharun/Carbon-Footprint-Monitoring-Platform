const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Eureka = require('eureka-js-client').Eureka;

const PORT = 8080;
const EUREKA_HOST = 'localhost';
const EUREKA_PORT = 8761;
const TRANSPORTATION_SERVICE_NAME = 'Transportation-CFMS';
const PRODUCTION_SERVICE_NAME = 'Production-CFMS';
const INVENTORY_SERVICE_NAME = 'Inventory-CFMS';

const app = express();

// Middleware to parse incoming request bodies
app.use(express.json());

// If your React application is running on a different origin (e.g., http://localhost:3000) than your Express server (e.g., http://localhost:8080), you need to enable CORS in your Express server to allow requests from the React application.
app.use(cors());


// Route to handle combined transportationProduction request.
app.use('/transportationProduction', async (req, res) => {
    
  const { date, vehicleId, fuelType, fuelConsumption, transportationType, vendor, transportInventoryDetailList } = req.body;

  try {

    // Create object for transportation data
    const transportation = {
      date,
      vehicleId,
      fuelType,
      fuelConsumption,
      transportationType,
      vendor,
      transportInventoryDetailList
    }
 
    // Forward transportation data to transportation microservice
    const transportationService = getTargetServiceUrl(TRANSPORTATION_SERVICE_NAME);
    await axios.post(transportationService + '/transportation', transportation);

    // Forward production data to production microservice
    const productionService = getTargetServiceUrl(PRODUCTION_SERVICE_NAME);

    // Iterate over each transport inventory detail
    for (const transportInventoryDetail of transportInventoryDetailList) {

      // Create production data object for each transport inventory detail
      const productionData = {
        vendorName: vendor, // Assuming vendorName corresponds to vendor in your DTO
        productName: transportInventoryDetail.productName, // Assuming productName is available in transportInventoryDetail
        transportInventoryQuantityDataDTO: {
          quantity: transportInventoryDetail.quantity // Assuming quantity is available in transportInventoryDetail
        }
      };
      
      // Send patch request for each item in the list
      await axios.patch(productionService + `/production/${productionData.vendorName}/${productionData.productName}`, productionData.transportInventoryQuantityDataDTO);
    }
    
    res.status(200).send('Data forwarded successfully to Transportation, Production, and Inventory services.');

  } catch (error) {
      console.error('Error forwarding data to Transportation, Production, and Inventory services.', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle addVendor request
app.use('/addVendor', async (req, res) => {
    
  const { vendorName, location, productList } = req.body;

  try {

    // Create object for vendor data
    const vendor = {
      vendorName,
      location,
      productList
    }
 
    // Forward vendor data to production microservice
    const productionService = getTargetServiceUrl(PRODUCTION_SERVICE_NAME);
    await axios.post(productionService + '/vendor', vendor);
    
    res.status(200).send('Data forwarded successfully to Production service.');

  } catch (error) {
      console.error('Error forwarding data to Production service.', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to handle retrieving co2e Emission for Transportation and Production for a particular product.
app.post('/co2eEmission/:productName', async (req, res) => {
  try {
      const { productName } = req.params;

      const transportationService = getTargetServiceUrl(TRANSPORTATION_SERVICE_NAME);
      const productionService = getTargetServiceUrl(PRODUCTION_SERVICE_NAME);

      // Send requests to transportation and production microservices concurrently
      const [transportationResponse, productionResponse] = await Promise.all([
          axios.post(`${transportationService}/transportation/co2eEmission/${productName}`),
          axios.post(`${productionService}/production/co2eEmission/${productName}`)
      ]);

      // Aggregate responses and send back to the client
      const responseData = {
        productName: productName,
        transportationCo2eEmission: transportationResponse.data.totalCo2eEmission,
        productionCo2eEmission: productionResponse.data.totalCo2eEmission
      };

      res.status(200).json(responseData);
      
  } catch (error) {
      console.error('Error forwarding data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Utility function to get the URL of a registered service
function getTargetServiceUrl(serviceName) {
    const instance = client.getInstancesByAppId(serviceName);
    if (instance.length > 0) {
      const { ipAddr, port } = instance[0];
      return `http://${ipAddr}:${port.$}`;
    }
    return null;
  }


// Eureka client setup
const client = new Eureka({
  instance: {
    app: 'Web-ApiGateway',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: { '$': PORT, '@enabled': 'true' },
    vipAddress: 'Web-ApiGateway',
    dataCenterInfo: { '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn' },
  },
  eureka: {
    host: EUREKA_HOST,
    port: EUREKA_PORT,
    servicePath: '/eureka/apps/',
  },
});

// Start Eureka client
client.start();

// Start the gateway server
app.listen(PORT, () => {
  console.log(`Web-ApiGateway has started on PORT: ${PORT}`);
});
