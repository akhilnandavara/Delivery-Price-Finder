const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const Item = require('../models/item');
const Organization = require('../models/organization');
const Pricing = require('../models/pricing');

exports.calculatePrice = async (zone, organizationId, total_distance, itemType) => {
  try {
    // Check if the organization exists
    const organization = await Organization.findByPk(organizationId);
    if (!organization) {
      return { success: false, message: 'Organization not found' };
    }

    // Check if the item type is valid
    if (itemType !== 'perishable' && itemType !== 'non-perishable') {
      return { success: false, message: 'Invalid item type' };
    }

    const rows = await sequelize.query(
      'SELECT base_distance_in_km, km_price, fix_price FROM pricing WHERE organization_id = :organizationId AND zone = :zone AND item_type = :itemType',
      {
        replacements: { organizationId, zone, itemType },
        type: QueryTypes.SELECT
      }
    );

    if (rows.length === 0) {
      return { success: false, message: 'Pricing data not found for the given parameters' };
    }

    const { base_distance_in_km, km_price, fix_price } = rows[0];

    let price = fix_price * 100;  // Convert fix_price to cents
    const extraDistance = total_distance - base_distance_in_km;

    if (extraDistance > 0) {
      price += extraDistance * (itemType === 'perishable' ? km_price * 100 : km_price * 100); // Convert km_price to cents
    }

    return { success: true, total_price: (price / 100).toFixed(2) };  // Convert back to euros
  } catch (error) {
    // console.error('Error calculating price:', error);
    return { success: false, message: 'Internal server error' , error: error.message};
  }
};

exports.createFoodEntry = async (organizationName, zone, itemTypeDescriptions, baseDistancekm, kmPrice, fixPrice) => {
  let transaction;
  try {
    // Validate input data
    if (!zone || !organizationName || !itemTypeDescriptions || !baseDistancekm || !kmPrice || !fixPrice) {
      return { success: false, message: 'Missing required input data' };
    }

    

    // Validate numeric values
    if (isNaN(baseDistancekm) || isNaN(kmPrice) || isNaN(fixPrice)) {
      return { success: false, message: 'Invalid numeric values' };
    }

      // Validate itemTypeDescriptions
      if (!Array.isArray(itemTypeDescriptions) || itemTypeDescriptions.length === 0) {
        
        return { success: false, message: 'Invalid itemTypeDescriptions' };
      }

    for (const itemDesc of itemTypeDescriptions) {
     
      if (!itemDesc.type || !itemDesc.description) {
        return { success: false, message: 'Each item in itemTypeDescriptions should have type and description' };
      }
    }


    // Sync all defined models to the database
    await sequelize.sync({ force: true });

    // Start a transaction
    transaction = await sequelize.transaction();

    // Insert data into Organization table
    const organization = await Organization.create({
      name: organizationName,
    }, { transaction });

    // Insert multiple items into Item table
    const items = [];
    console.log("itemTypeDescriptions...........",itemTypeDescriptions)
    for (const { type, description } of itemTypeDescriptions) {
     
      const item = await Item.create({
        type: type,
        description: description,
      }, { transaction });
      items.push(item);
    }

console.log("items...........",items)
    // Insert data into Pricing table for each item
    for (const item of items) {
      await Pricing.create({
        organizationId: organization.id,
        itemId: item.id,
        zone: zone,
        baseDistancekm: baseDistancekm,
        kmPrice: kmPrice,
        fixPrice: fixPrice,
      }, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    console.log('Sample data inserted successfully.');
    return { success: true, message: 'Sample data inserted successfully' };
  } catch (error) {
    console.error('Unable to insert sample data:', error);

    // Rollback the transaction if it exists
    if (transaction) {
      await transaction.rollback();
    }

    return { success: false, message: 'Internal server error' };
  } finally {
    await sequelize.close();  // Close the connection after all operations are completed
  }
};
