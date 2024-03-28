const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    dialectOptions: {
      ssl: false, // Disable SSL
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
