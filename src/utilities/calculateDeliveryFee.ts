export function calculateCartValueFee(cartValue?: number) {
  if (cartValue === undefined) {
    return 0;
  }

  if (cartValue >= 200) {
    return 0;
  }

  const result = cartValue < 10 ? 10 - cartValue : 0;

  return parseFloat(result.toFixed(2));
}

export function calculateDistanceFee(meters?: number) {
  if (meters === undefined) {
    return 0;
  }
  let distanceFee = 0;
  if (meters <= 1000) {
    distanceFee = 2;
  } else {
    const additionalDistance = Math.ceil((meters - 1000) / 500);
    distanceFee = 2 + additionalDistance;
  }
  return distanceFee;
}

export function calculateItemsFee(quantity?: number) {
  if (quantity === undefined) {
    return 0;
  }
  let itemsFee = 0;
  if (quantity >= 5) {
    itemsFee = (quantity - 4) * 0.5;
  }

  let extraBulkFee = 0;
  if (quantity > 12) {
    extraBulkFee = 1.2;
  }

  return itemsFee + extraBulkFee;
}

// Friday rush is 3 - 7 PM in the timezone of the browser
export function getFridayRushFeeMultiplier(
  deliveryHour?: number,
  dayOfTheWeek?: number
) {
  if (deliveryHour === undefined || dayOfTheWeek === undefined) {
    return 1;
  }
  if (dayOfTheWeek === 5 && deliveryHour >= 15 && deliveryHour <= 19) {
    return 1.2;
  }
  return 1;
}

const MAX_TOTAL_FEE = 15;

export const calculateTotalFee = (
  cartValue: number,
  cartValueFee: number,
  distanceFee: number,
  itemsFee: number,
  deliveryHour?: number,
  dayOfTheWeek?: number
) => {
  if (cartValue >= 200) {
    return 0;
  }
  const totalFee =
    (cartValueFee + distanceFee + itemsFee) *
    getFridayRushFeeMultiplier(deliveryHour, dayOfTheWeek);

  const roundedTotalFee = Math.round(totalFee * 100) / 100;
  return Math.min(roundedTotalFee, MAX_TOTAL_FEE);
};
