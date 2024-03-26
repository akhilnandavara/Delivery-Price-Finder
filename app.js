const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pricingRoutes = require('./routes/pricingRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/pricing', pricingRoutes);

// Swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
  res.send('Welcome to the pricing API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
