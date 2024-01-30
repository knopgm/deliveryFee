import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.tsx';

test('Renders the main page', async () => {
  render(<App />);

  const cartValueInput = screen.getByLabelText<HTMLInputElement>('Cart value:');
  expect(cartValueInput).toBeVisible();

  const distanceInput =
    screen.getByLabelText<HTMLInputElement>('Delivery distance:');
  expect(distanceInput).toBeVisible();

  const itemsQtnInput =
    screen.getByLabelText<HTMLInputElement>('Number of items:');
  expect(itemsQtnInput).toBeVisible();

  const startDateInput = screen.getByLabelText<HTMLInputElement>(
    'Schedule your delivery:'
  );
  expect(startDateInput).toBeVisible();

  const calculateFeeButton = screen.getByRole('button', {
    name: 'Calculate delivery fee',
  });
  expect(calculateFeeButton).toBeVisible();

  const totalFeeOutput = screen.getByText<HTMLInputElement>('Total Fee:');
  expect(totalFeeOutput).toBeVisible();
});

test('User interaction', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.type(screen.getByLabelText('Cart value:'), '8,90');
  await user.type(screen.getByLabelText('Delivery distance:'), '1499');
  await user.type(screen.getByLabelText('Number of items:'), '13');
  await user.type(screen.getByTestId('datePicker'), '26/01/2024 4:00 PM');
  expect(
    screen.getByRole('button', { name: 'Calculate delivery fee' })
  ).toBeVisible();
  await user.click(
    screen.getByRole('button', { name: 'Calculate delivery fee' })
  );
  expect(screen.getByTestId('fee').textContent).toBe('11.76$');
});
