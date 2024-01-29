import {
  calculateCartValueFee,
  calculateDistanceFee,
  calculateItemsFee,
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
    expect(getFridayRushFeeMultiplier(2, 6)).toBe(1);
    expect(getFridayRushFeeMultiplier(3, 6)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(4, 6)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(5, 6)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(6, 6)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(7, 6)).toBe(1.2);
    expect(getFridayRushFeeMultiplier(8, 6)).toBe(1);
    expect(getFridayRushFeeMultiplier(5, 5)).toBe(1);
  });
});
