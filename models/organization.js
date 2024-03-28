const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Organization extends Model {}

Organization.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Organization',
  timestamps: false, // Disable createdAt and updatedAt columns
});

module.exports = Organization;
