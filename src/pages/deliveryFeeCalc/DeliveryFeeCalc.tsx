import { useState } from 'react';
import {
  calculateCartValueFee,
  calculateDistanceFee,
  calculateItemsFee,
} from '../../utilities/calculateDeliveryFee';

type CartItem = {
  price: number;
  quantity: number;
};

type DeliveryFeeCalcProps = {
  items: CartItem[];
};

export default function DeliveryFeeCalc(props: DeliveryFeeCalcProps) {
  const [fee, setFee] = useState(0);
  const [cartValue, setCartValue] = useState<number | undefined>(undefined);
  const [distance, setDistance] = useState(0);
  const [items, setItems] = useState(0);

  // When user type, it set's a new cart value
  const handleCartValueInputChange = (value?: number) => {
    setCartValue(value);
  };
  const cartValueFee = calculateCartValueFee(cartValue);

  // When user type, set a new distance value
  const handleDistanceFee = (meters: number) => {
    setDistance(meters);
  };
  const distanceFee = calculateDistanceFee(distance);

  const handleItemsFee = (quantity: number) => {
    setItems(quantity);
  };

  const itemsFee = calculateItemsFee(items);

  const handleTotalFee = (
    cartValuefee: number,
    distanceFee: number,
    itemsFee: number
  ) => {
    if (cartValue === undefined) {
      return 0;
    }
    if (cartValue >= 200) {
      return;
    }
    let totalFee = cartValuefee + distanceFee + itemsFee;
    if (totalFee > 15) {
      totalFee = 15;
    }
    setFee(totalFee);
  };

  console.log({ cartValue });

  return (
    <div>
      <h1>Delivery Fee Calculator</h1>
      <form>
        <label htmlFor="cart-value">Cart value</label>
        <input
          required
          id="cart-value"
          name="cart-value"
          value={cartValue ?? ''}
          // onKeyDown={(event) => {
          //   if (!/^[0-9]$/.test(event.key)) {
          //     event.preventDefault();
          //   }
          // }}
          onChange={(event) => {
            console.log(event.target.value);
            const inputValue = event.target.value;
            if (
              inputValue === '' ||
              /^[1-9]([0-9]+)?((\.|,)([0-9]{0,2}))?$/.test(event.target.value)
            ) {
              handleCartValueInputChange(parseFloat(event.target.value));
            }
          }}
        />
        <label htmlFor="delivery-distance">Delivery distance</label>
        <input
          required
          id="delivery-distance"
          name="delivery-distance"
          value={distance}
          onChange={(event) => {
            handleDistanceFee(parseFloat(event.target.value));
          }}
        />
        <label htmlFor="items-quantity">Number of items</label>
        <input
          required
          id="items-quantity"
          name="items-quantity"
          value={items}
          onChange={(event) => {
            handleItemsFee(parseFloat(event.target.value));
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleTotalFee(cartValueFee, distanceFee, itemsFee);
          }}
        >
          Calculate Fee
        </button>
      </form>
      <h3>Total Fee = {fee}$</h3>
    </div>
  );
}
