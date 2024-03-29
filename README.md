
```markdown
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

### 1. Setup Project

- **Initialize a Node.js project and install required packages:**

```bash
npm init -y
npm install express sequelize pg pg-hstore
```

### 2. Database Setup

- **Create a PostgreSQL database and implement the schema with the mentioned tables.**

### 3. Define Models

- **Create Sequelize models for Organization, Item, and Pricing in the `models` directory.**

### 4. Implement Controllers

- **Create a controller (`pricingController.js`) to handle the pricing API requests.**

### 5. Implement Services

- **Create a service (`pricingService.js`) to calculate the dynamic pricing based on the provided inputs.**

### 6. Implement API Endpoints

- **Implement the REST API endpoints using Express.js in `pricingRoutes.js`.**

### 7. Implement Tests

- **Write tests (`pricing.test.js`) to cover major functionalities and edge cases using Jest.**

### 8. Setup Swagger Documentation

- **Integrate Swagger in `swaggerOptions.js` to document the API endpoints.**

### 9. Implement Error Handling

- **Handle errors and input validation in the API.**

### 10. Linting

- **Ensure code follows Airbnb's style guide by configuring ESLint in `.eslintrc.json`.**

---

## Submission

- **Deploy the application on `render.com` with a proper Swagger page.**
  
- **Provide the complete source code with service objects, controllers, and models.**
  
- **Include API documentation detailing endpoints, request/response formats, and error handling.**
  
- **Provide a test suite (`pricing.test.js`) covering major functionalities and edge cases.**
  
- **Include a setup guide with instructions for setting up the project and database locally.**

---

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/akhilnandavara/Delivery-Price-Finder
cd food-delivery-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Configuration

- **Set the `DATABASE_URL` environment variable in your `.env` file or directly in your shell:**

```bash
export DATABASE_URL='postgres://username:password@localhost:5432/food_delivery'
```

### 4. Create PostgreSQL Database

- **Create a folder named `food_delivery` in pgAdmin 4.**

```bash
psql -U username -c "CREATE DATABASE food_delivery;"
```

### 5. Run Migrations

```bash
npx sequelize-cli db:migrate
```

### 6. Start the Application

```bash
npm start
```

---

## Testing Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

```bash
npm test
```

This will execute the test suite (`pricing.test.js`) and display the results.

---

For more information about my portfolio, please visit [Your Portfolio Link Here](https://akhilnadavara.me/).

---
```
