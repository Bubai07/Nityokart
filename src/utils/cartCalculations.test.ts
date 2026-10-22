import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartSubtotal,
  calculateTotalQuantity,
  applyPromoCode,
  calculateDeliveryFee,
  calculateGST,
  calculateFinalTotal,
  formatIndianCurrency,
  validateReservationBooking,
} from './cartCalculations';

test('calculates cart subtotal and total quantities correctly', () => {
  const items = [
    { id: 1, name: 'Kashmiri Apples', price: 149, quantity: 2 },
    { id: 2, name: 'Fresh Milk', price: 35, quantity: 4 },
    { id: 3, name: 'Sourdough Loaf', price: 120, quantity: 1 },
  ];

  assert.equal(calculateCartSubtotal(items), 149 * 2 + 35 * 4 + 120 * 1); // 298 + 140 + 120 = 558
  assert.equal(calculateTotalQuantity(items), 7);
});

test('handles promo code validation and discounts properly', () => {
  // Invalid code
  const invalid = applyPromoCode('BOGUS', 500);
  assert.equal(invalid.valid, false);

  // FRESH20 under min order
  const underMin = applyPromoCode('FRESH20', 200);
  assert.equal(underMin.valid, false);

  // FRESH20 above min order (20% of 400 = 80)
  const valid20 = applyPromoCode('fresh20', 400);
  assert.equal(valid20.valid, true);
  assert.equal(valid20.discountAmount, 80);

  // FRESH20 cap at 150
  const capped20 = applyPromoCode('FRESH20', 1000);
  assert.equal(capped20.discountAmount, 150);

  // NITYO50 flat discount
  const nityo50 = applyPromoCode('NITYO50', 300);
  assert.equal(nityo50.valid, true);
  assert.equal(nityo50.discountAmount, 50);
});

test('delivery fee is free above threshold of 499', () => {
  assert.equal(calculateDeliveryFee(0), 0);
  assert.equal(calculateDeliveryFee(300), 49);
  assert.equal(calculateDeliveryFee(499), 0);
  assert.equal(calculateDeliveryFee(800), 0);
});

test('computes complete order breakdown with tax and tip', () => {
  const result = calculateFinalTotal({
    subtotal: 500,
    discountAmount: 50,
    deliveryFee: 0,
    tipAmount: 20,
  });

  // subtotalAfterDiscount = 450
  // gst = 450 * 0.05 = 23 (rounded)
  // total = 450 + 0 + 23 + 20 = 493
  assert.equal(result.subtotal, 500);
  assert.equal(result.discount, 50);
  assert.equal(result.delivery, 0);
  assert.equal(result.gst, 23);
  assert.equal(result.tip, 20);
  assert.equal(result.total, 493);
});

test('currency formatting adds Indian Rupee symbol and formatting', () => {
  assert.equal(formatIndianCurrency(1250), '₹1,250');
  assert.equal(formatIndianCurrency(49), '₹49');
});

test('reservation validation catches missing inputs and invalid phone numbers', () => {
  assert.equal(validateReservationBooking({ name: '', phone: '9876543210', date: '2026-10-25', timeSlot: '10:00 AM' }).valid, false);
  assert.equal(validateReservationBooking({ name: 'Rahul', phone: '123', date: '2026-10-25', timeSlot: '10:00 AM' }).valid, false);
  assert.equal(validateReservationBooking({ name: 'Rahul', phone: '9876543210', date: '', timeSlot: '10:00 AM' }).valid, false);
  assert.equal(validateReservationBooking({ name: 'Rahul Sharma', phone: '9876543210', date: '2026-10-25', timeSlot: '10:00 AM' }).valid, true);
});
