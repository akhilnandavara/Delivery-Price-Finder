const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/food_delivery', {
  dialect: 'postgres',
  define: {
    timestamps: false, // Disable timestamps
  },
  logging: false, // Disable logging
});

module.exports = sequelize;
