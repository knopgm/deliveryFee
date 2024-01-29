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

export function calculateDistanceFee(meters: number) {
  let distanceFee = 0;
  if (meters <= 1000) {
    distanceFee = 2;
  } else {
    const additionalDistance = Math.ceil((meters - 1000) / 500);
    distanceFee = 2 + additionalDistance;
  }
  console.log('>>>', distanceFee);
  return distanceFee;
}

export function calculateItemsFee(quantity: number) {
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
  deliveryTime: number,
  dayOfTheWeek: number
) {
  if (dayOfTheWeek === 6 && deliveryTime >= 3 && deliveryTime <= 7) {
    return 1.2;
  }
  return 1;
}
