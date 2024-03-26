const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Organization = require('./organization');
const Item = require('./item');

class Pricing extends Model {}

Pricing.init({
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Organization,
      key: 'id',
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id',
    },
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  baseDistancekm: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  kmPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fixPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Pricing',
});

module.exports = Pricing;
