const express = require('express');

const router = express.Router();
const { calculatePricing, createFoodEntry } = require('../controllers/pricingController');

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Endpoints for pricing functionalities
 */

/**
 * @swagger
 * /api/pricing/calculate-price:
 *   post:
 *     summary: Calculate price based on certain parameters
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 default: 'east'
 *                 description: Zone for the delivery (e.g., east, west)
 *               organization_id:
 *                 type: string
 *                 default: '1'
 *                 description: Organization ID
 *               total_distance:
 *                 type: number
 *                 default: 10
 *                 description: Total distance of the delivery
 *               item_type:
 *                 type: string
 *                 default: 'non-perishable'
 *                 description: Type of the item (e.g., perishable, non-perishable)
 *     responses:
 *       200:
 *         description: Successful calculation of price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   example: 0
 *                   description: Calculated total price for the delivery
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid parameters'
 *                   description: Error message indicating the reason for bad request
 */

router.post('/calculate-price', calculatePricing);

/**
 * @swagger
 * /api/pricing/create-entry:
 *   post:
 *     summary: Create a new food entry
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *                 default: 'Example Org'
 *                 description: Name of the organization
 *               zone:
 *                 type: string
 *                 default: 'east'
 *                 description: Zone for the delivery (e.g., east, west)
 *               item_type:
 *                 type: string
 *                 default: 'non-perishable'
 *                 description: Type of the item (e.g., perishable, non-perishable)
 *               description:
 *                 type: string
 *                 default: 'Sample food item'
 *                 description: Description of the food item
 *               base_distance_in_km:
 *                 type: number
 *                 default: 5
 *                 description: Base distance for the pricing
 *               km_price:
 *                 type: number
 *                 default: 1.5
 *                 description: Price per kilometer
 *               fix_price:
 *                 type: number
 *                 default: 10
 *                 description: Fixed price
 *     responses:
 *       200:
 *         description: Food Entry Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the food entry was created successfully
 *                 message:
 *                   type: string
 *                   example: 'Food Entry Created'
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid parameters'
 *                   description: Error message indicating the reason for bad request
 */

router.post('/create-entry', createFoodEntry);

module.exports = router;
