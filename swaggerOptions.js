const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Food-Delivery-Fees API',
      version: '1.0.0',
      description: 'API for pricing functionalities',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? process.env.API_URL : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/pricingRoutes.js'],
  swaggerOptions: {
    customCss: `
      .swagger-ui .topbar {
        background-color: #1E90FF; /* Change the top bar background color */
      }
      .swagger-ui .info .title {
        font-size: 2em; /* Increase the title font size */
      }
      .swagger-ui .info .version {
        font-size: 1.5em; /* Increase the version font size */
      }
      .swagger-ui .info .description {
        font-size: 1.2em; /* Increase the description font size */
      }
      .swagger-ui .opblock .opblock-summary-path {
        font-size: 1.2em; /* Increase the operation summary font size */
      }
      .swagger-ui .opblock .opblock-summary {
        font-size: 1.1em; /* Increase the operation summary font size */
      }
      .swagger-ui .opblock .opblock-description {
        font-size: 1em; /* Increase the operation description font size */
      }
      .swagger-ui .opblock .opblock-params-section .opblock-section-header {
        font-size: 1.1em; /* Increase the parameters section header font size */
      }
      .swagger-ui .opblock .opblock-responses-title {
        font-size: 1.1em; /* Increase the responses title font size */
      }`,
  },
};

module.exports = swaggerOptions;
