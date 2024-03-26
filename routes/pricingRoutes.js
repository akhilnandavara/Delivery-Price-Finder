const express = require('express');
const router = express.Router();
const { calculatePricing, createFoodEntry } = require('../controllers/pricingController');

router.post('/calculate-price', calculatePricing);
router.post('/create-entry',createFoodEntry );

module.exports = router;
