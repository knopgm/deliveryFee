import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.tsx';
import { calculateCartValueFee } from '../pages/deliveryFeeCalc/DeliveryFeeCalc.tsx';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', async () => {
  render(<App />);

  const cartValueInput = screen.getByLabelText<HTMLInputElement>('Cart value');
  fireEvent.change(cartValueInput, { target: { value: 'A random string' } });
  expect(cartValueInput.value).toBe('');
});

describe('calculateCartValueFee', () => {
  test('returns 0 when provided cart value is undefined', () => {
    expect(calculateCartValueFee(undefined)).toBe(0);
  });

  test('returns 0 when provided cart value is 200', () => {
    expect(calculateCartValueFee(200)).toBe(0);
  });

  test('returns 0 when provided cart value greater than 200', () => {
    expect(calculateCartValueFee(201)).toBe(0);
  });

  test('returns 0 when provided cart value greater than 200', () => {
    expect(calculateCartValueFee(201)).toBe(0);
  });
});
