import {
  calculateCartValueFee,
  calculateDistanceFee,
  calculateItemsFee,
  calculateTotalFee,
  getFridayRushFeeMultiplier,
} from './calculateDeliveryFee';

describe('calculateCartValueFee', () => {
  test('returns 0 when provided cart value is undefined', () => {
    expect(calculateCartValueFee(undefined)).toBe(0);
  });

  test('returns 0 when provided cart value greater than or equal to 200', () => {
    expect(calculateCartValueFee(200)).toBe(0);
    expect(calculateCartValueFee(201)).toBe(0);
    expect(calculateCartValueFee(999)).toBe(0);
  });

  test('returns the diff between the provide cart value and 10', () => {
    expect(calculateCartValueFee(8)).toBe(2);
    expect(calculateCartValueFee(7.1)).toEqual(2.9);
    expect(calculateCartValueFee(1)).toBe(9);
    expect(calculateCartValueFee(0)).toBe(10);
  });
});

describe('calculateDistanceFee', () => {
  test('a delivery fee for the first 1000 meters (=1km) is 2', () => {
    expect(calculateDistanceFee(0)).toBe(2);
    expect(calculateDistanceFee(10)).toBe(2);
    expect(calculateDistanceFee(1000)).toBe(2);
    expect(calculateDistanceFee(999)).toBe(2);
  });

  test('add 1 to the base value (2) for each additional 500 meters', () => {
    expect(calculateDistanceFee(1000)).toBe(2);
    expect(calculateDistanceFee(1001)).toBe(3);
    expect(calculateDistanceFee(1499)).toBe(3);
    expect(calculateDistanceFee(1500)).toBe(3);
    expect(calculateDistanceFee(1501)).toBe(4);
    expect(calculateDistanceFee(2000)).toBe(4);
    expect(calculateDistanceFee(2001)).toBe(5);
  });
});

describe('calculateItemsFee', () => {
  test('returns 0 if provided number of items if less than 5', () => {
    expect(calculateItemsFee(0)).toBe(0);
    expect(calculateItemsFee(1)).toBe(0);
    expect(calculateItemsFee(2)).toBe(0);
    expect(calculateItemsFee(3)).toBe(0);
    expect(calculateItemsFee(4)).toBe(0);
    expect(calculateItemsFee(5)).not.toEqual(0);
  });

  test('add 0.50 if provided number of items is equals or greater than 5', () => {
    expect(calculateItemsFee(5)).toBe(0.5);
    expect(calculateItemsFee(6)).toBe(1);
    expect(calculateItemsFee(7)).toBe(1.5);
    expect(calculateItemsFee(8)).toBe(2);
    expect(calculateItemsFee(10)).toBe(3);
    expect(calculateItemsFee(12)).toBe(4);
  });

  test('add 1.20 on top of the 0.50 fee if provided number of items is greater than 12', () => {
    expect(calculateItemsFee(13)).toBe(5.7);
    expect(calculateItemsFee(14)).toBe(6.2);
  });
});

describe('getFridayRushFeeMultiplier', () => {
  test('returns 1.2 if provided day is 6 and the delivery time is between 3 and 7', () => {
    expect(getFridayRushFeeMultiplier(undefined, 5)).toBe(1);
    expect(getFridayRushFeeMultiplier(14, undefined)).toBe(1);
    expect(getFridayRushFeeMultiplier(undefined, undefined)).toBe(1);
    expect(getFridayRushFeeMultiplier(14, 5)).toBe(1);
    expect(getFridayRushFeeMultiplier(15, 5)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(16, 5)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(17, 5)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(18, 5)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(19, 5)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(20, 5)).toBe(1);
    expect(getFridayRushFeeMultiplier(17, 4)).toBe(1);
  });
});

describe('calculateTotalFee', () => {
  test('returns 0 if provided cart value is greater than or equal to 200', () => {
    expect(calculateTotalFee(1, 1, 1, 1, 1, 1)).not.toBe(0);
    expect(calculateTotalFee(199, 1, 1, 1, 1, 1)).not.toBe(0);
    expect(calculateTotalFee(200, 1, 1, 1, 1, 1)).toBe(0);
    expect(calculateTotalFee(201, 1, 1, 1, 1, 1)).toBe(0);
    expect(calculateTotalFee(999, 1, 1, 1, 1, 1)).toBe(0);
  });

  test('returns the sum of provided fees when cart value is less than 200', () => {
    expect(calculateTotalFee(1, 1, 1, 1, 1, 1)).toBe(3);
    expect(calculateTotalFee(199, 1, 1, 1, 1, 1)).toBe(3);
    expect(calculateTotalFee(199, 1, 2, 3, 1, 1)).toBe(6);
  });

  test('returns the sum of provided fee x 1.2 when cart value is less than 200 on friday rush time (between 15 and 19)', () => {
    expect(calculateTotalFee(1, 1, 1, 1, 15, 5)).toBe(3.6);
    expect(calculateTotalFee(199, 1, 1, 1, 19, 5)).toBe(3.6);
    expect(calculateTotalFee(199, 1, 2, 3, 19, 5)).toBe(7.2);
  });
});
