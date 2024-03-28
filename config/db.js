const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  define: {
    timestamps: false, // Disable timestamps
  },
  logging: false, // Disable logging
});

module.exports = sequelize;
