
# Food Price Finder - REST API Backend for Viga Entertainment

## Overview

This project aims to develop a REST API backend for a food delivery app for Viga Entertainment using Node.js. The primary objective is to create a dynamic pricing module to calculate the total cost of food delivery based on various factors such as distance and item type.

---

## Table of Contents

- [Features](#features)
- [Database Schema](#database-schema)
- [Folder Structure](#folder-structure)
- [Implementation Steps](#implementation-steps)
- [Submission](#submission)
- [Setup Guide](#setup-guide)
- [Testing Locally](#testing-locally)

---

## Features

### 1. Dynamic Pricing Module with REST API

#### Purpose

To calculate delivery costs for different types of food items across various zones based on the distance and item type.

#### Pricing Calculation

- **Base Distance and Price:**
  - Base distance: 5 km
  - Base price: 10 euros

- **Per Km Price:**
  - Perishable items: 1.5 EUR/km
  - Non-perishable items: 1 EUR/km

#### API Response

The API should return the total price for delivering the specified food items in the given zone for a particular organization.

---

## Database Schema

### Database: PostgreSQL

#### Design:

- **Organization Table:**
  - id (Primary Key)
  - name

- **Item Table:**
  - id (Primary Key)
  - type
  - description

- **Pricing Table:**
  - organization_id (Foreign Key)
  - item_id (Foreign Key)
  - zone
  - base_distance_in_km
  - km_price
  - fix_price

#### Validations:

Implement validations for API input payloads to ensure data integrity.

---

## Folder Structure

```plaintext
/food-delivery-backend
|--/config
|  |--db.js
|-- /controllers
|   |-- pricingController.js
|-- /models
|   |-- organization.js
|   |-- item.js
|   |-- pricing.js
|-- /routes
|   |-- pricingRoutes.js
|-- /services
|   |-- pricingService.js
|-- /tests
|   |-- pricing.test.js
|-- app.js
|-- swaggerOptions.js
|-- .gitignore
|-- package.json
|-- .eslintrc.json
|-- README.md
```

---

## Implementation Steps

1. **Setup Project:**
    - Initialize a Node.js project and install required packages.
    ```bash
    npm init -y
    npm install express sequelize pg pg-hstore
    ```

2. **Database Setup:**
    - Create a PostgreSQL database and implement the schema with the mentioned tables.

3. **Define Models:**
    - Create Sequelize models for Organization, Item, and Pricing in the `models` directory.

4. **Implement Controllers:**
    - Create a controller (`pricingController.js`) to handle the pricing API requests.

5. **Implement Services:**
    - Create a service (`pricingService.js`) to calculate the dynamic pricing based on the provided inputs.

6. **Implement API Endpoints:**
    - Implement the REST API endpoints using Express.js in `pricingRoutes.js`.

7. **Implement Tests:**
    - Write tests (`pricing.test.js`) to cover major functionalities and edge cases using Jest.

8. **Setup Swagger Documentation:**
    - Integrate Swagger in `swaggerOptions.js` to document the API endpoints.

9. **Implement Error Handling:**
    - Handle errors and input validation in the API.

10. **Linting:**
    - Ensure code follows Airbnb's style guide by configuring ESLint in `.eslintrc.json`.

---

## Submission

- Deploy the application on `render.com` with a proper Swagger page.
- Provide the complete source code with service objects, controllers, and models.
- Include API documentation detailing endpoints, request/response formats, and error handling.
- Provide a test suite (`pricing.test.js`) covering major functionalities and edge cases.
- Include a setup guide with instructions for setting up the project and database locally.

---

## Setup Guide

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/akhilnandavara/Delivery-Price-Finder
    cd food-delivery-backend
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Database Configuration:**
    - Update the database connection details in `config/db.js`.

    ```javascript
    const { Sequelize } = require('sequelize');

    module.exports = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
    });
    ```

    - Create a PostgreSQL database in pgAdmin 4 named `food_delivery`.

    ```bash
    psql -U postgres -c "CREATE DATABASE food_delivery;"
    ```

    - Update the `.env` file with the following:

    ```
    DATABASE_URL='postgres://postgres:password@localhost:5432/food_delivery'
    ```

4. **Run Migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the Application:**
    ```bash
    npm start
    ```

---

## Testing Locally

To test the application locally, follow these steps:

1. **Install Dependencies:**
    ```bash
    npm install
    ```

2. **Run Tests:**
    ```bash
    npm test
    ```

This will execute the test suite (`pricing.test.js`) and display the results.

---

For more information about my portfolio, please visit [Your Portfolio Link Here](https://akhilnadavara.me/).

---