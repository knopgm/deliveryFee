export function calculateCartValueFee(cartValue?: number) {
  if (cartValue === undefined) {
    return 0;
  }

  if (cartValue >= 200) {
    return 0;
  }

  return cartValue < 10 ? 10 - cartValue : 0;
}

export function calculateDistanceFee(meters: number) {
  let distanceFee = 0;
  if (meters <= 1000) {
    distanceFee = 2;
  } else {
    const adicionalDistance = Math.ceil((meters - 1000) / 500);
    distanceFee = 2 + adicionalDistance;
  }
  console.log('>>>', distanceFee);
  return distanceFee;
}

export function calculateItemsFee(quantity: number) {
  let itemsFee = 0;
  if (quantity >= 5 && quantity < 12) {
    itemsFee = (quantity - 4) * 0.5;
  } else if (quantity > 12) {
    itemsFee = (quantity - 4) * 0.5 + 1.2;
  }
  console.log(itemsFee);
  return itemsFee;
}
