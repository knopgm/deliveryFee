import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  calculateCartValueFee,
  calculateDistanceFee,
  calculateItemsFee,
  calculateTotalFee,
} from '../../utilities/calculateDeliveryFee';

import './DeliveryFeeCalc.css';

import 'react-datepicker/dist/react-datepicker.css';

export default function DeliveryFeeCalc() {
  const [fee, setFee] = useState(0);
  const [cartValueInput, setCartValueInput] = useState<string>('');
  const [cartValue, setCartValue] = useState<number>(0);
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [itemsQtn, setItemsQtn] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  // When user type, it set's a new cart value
  const handleCartValueInputChange = (inputValue: string) => {
    if (inputValue === '') {
      setCartValueInput('');
      setCartValue(0);
    } else if (/^[1-9]([0-9]+)?((\.|,)([0-9]{0,2}))?$/.test(inputValue)) {
      setCartValueInput(inputValue);
      setCartValue(parseFloat(inputValue.replace(',', '.')));
    }
  };
  const cartValueFee = calculateCartValueFee(cartValue);

  // When user type, it set's a new distance value
  const handleDistanceFee = (meters: string) => {
    if (meters === '') {
      setDistance(undefined);
    } else {
      setDistance(parseInt(meters));
    }
  };
  const distanceFee = calculateDistanceFee(distance);

  // When user type, it set's a new quantity of items
  const handleItemsFee = (quantity: string) => {
    if (quantity === '') {
      setItemsQtn(undefined);
    }
    setItemsQtn(parseFloat(quantity));
  };
  const itemsFee = calculateItemsFee(itemsQtn);

  // Handle the calculate fee when user press button
  const handleTotalFee = () => {
    setFee(
      calculateTotalFee(
        cartValue,
        cartValueFee,
        distanceFee,
        itemsFee,
        startDate?.getHours(),
        startDate?.getDay()
      )
    );
  };

  return (
    <div>
      <h1>Delivery Fee Calculator</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleTotalFee();
        }}
      >
        <div className="inputLabel-wrapper">
          <label htmlFor="cart-value">Cart value:</label>
          <input
            required
            type="text"
            id="cart-value"
            name="cart-value"
            data-test-id="cartValue"
            value={cartValueInput}
            onChange={(event) => {
              handleCartValueInputChange(event.target.value);
            }}
          />
        </div>
        <div className="inputLabel-wrapper">
          <label htmlFor="delivery-distance">Delivery distance:</label>
          <input
            required
            type="number"
            min="0"
            id="delivery-distance"
            name="delivery-distance"
            data-test-id="deliveryDistance"
            value={distance ?? ''}
            onChange={(event) => {
              const inputValue = event.target.value;
              handleDistanceFee(inputValue);
            }}
          />
        </div>
        <div className="inputLabel-wrapper">
          <label htmlFor="items-quantity">Number of items:</label>
          <input
            required
            type="number"
            min="0"
            id="items-quantity"
            name="items-quantity"
            data-test-id="itemsQuantity"
            value={itemsQtn ?? ''}
            onChange={(event) => {
              handleItemsFee(event.target.value);
            }}
          />
        </div>
        <div className="inputLabel-wrapper">
          <label htmlFor="date-picker">Schedule your delivery:</label>
          <ReactDatePicker
            showTimeSelect
            id="date-picker"
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
              }
            }}
            customInput={
              <input
                data-test-id="datePicker"
                data-testid="datePicker"
                type="text"
              />
            }
          />
        </div>
        <div className="button-wrapper">
          <button type="submit">Calculate delivery fee</button>
        </div>
      </form>
      <div className="totalFee-wrapper">
        <h3 className="totalFee">
          Total Fee:{' '}
          <span data-test-id="fee" data-testid="fee">
            {fee}$
          </span>
        </h3>
      </div>
    </div>
  );
}
