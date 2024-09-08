const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
// If your React application is running on a different origin (e.g., http://localhost:3000) than your Express server (e.g., http://localhost:8080), you need to enable CORS in your Express server to allow requests from the React application.
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const backendRoutes = require('./routes/backend');

app.use('/auth', authRoutes); // Public routes for authentication
app.use('/', backendRoutes); // All other routes go to backendRoutes

app.listen(PORT, () => {
    console.log(`Web-APIGateway is running on port : ${PORT}`);
});
