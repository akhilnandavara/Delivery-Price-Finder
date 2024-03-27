const { calculatePrice } = require('../services/pricingService');
const { Item } = require('../models/item');
const { Organization } = require('../models/organization');
const { Pricing } = require('../models/pricing');

// Mocking the database models
jest.mock('../models/item.js', () => ({
  Item: {
    findOne: jest.fn(),
  },
}));

jest.mock('../models/organization.js', () => ({
  Organization: {
    findOne: jest.fn(),
  },
}));

jest.mock('../models/pricing.js', () => ({
  Pricing: {
    findOne: jest.fn(),
  },
}));

describe('calculatePrice', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate the correct price for perishable item', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };
    const mockPricing = {
      base_distance_in_km: 5,
      fix_price: 10,
      km_price: 1.5,
    };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(mockPricing);

    const result = await calculatePrice('central', '005', 12, 'perishable');
    expect(result).toEqual({
      success: true,
      total_price: '20.50',
    });
  });

  it('should calculate the correct price for non-perishable item', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };
    const mockPricing = {
      base_distance_in_km: 5,
      fix_price: 10,
      km_price: 1,
    };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(mockPricing);

    const result = await calculatePrice('central', '005', 12, 'non-perishable');
    expect(result).toEqual({
      success: true,
      total_price: '17.00',
    });
  });

  it('should return error if required input data is missing', async () => {
    const result = await calculatePrice();
    expect(result).toEqual({
      success: false,
      error: 'Missing required input data',
      message: 'Internal server error',
    });
  });

  it('should return error if total distance is non numeric  value', async () => {

    const result = await calculatePrice('east', '1', "string", 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Invalid distance value',
      message: 'Internal server error',
    });
  });

  it('should return error if organization not found', async () => {
    Organization.findOne.mockResolvedValueOnce(null);
    const result = await calculatePrice('east', '005', 12, 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Organization not found',
      message: 'Internal server error',
    });
  });

  it('should return error if item type is invalid', async () => {
    const result = await calculatePrice('east', '1', 12, 'invalidType');
    expect(result).toEqual({
      success: false,
      error: 'Invalid item type',
      message: 'Internal server error',
    });
  });

  it('should return error if pricing data not found', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(null);

    const result = await calculatePrice('central', '005', 12, 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Pricing data not found for the given parameters',
      message: 'Internal server error',
    });
  });
});
