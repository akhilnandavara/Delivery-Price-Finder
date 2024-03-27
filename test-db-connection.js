const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/food_delivery', {
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}
testConnection();
