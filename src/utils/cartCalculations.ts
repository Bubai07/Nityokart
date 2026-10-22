/**
 * Pure calculation and validation logic for Nityokart grocery cart and reservations.
 */

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PromoCodeResult {
  valid: boolean;
  code: string;
  discountAmount: number;
  message: string;
}

export const VALID_PROMO_CODES: Record<string, { type: 'percent' | 'flat'; value: number; minOrder: number; description: string }> = {
  FRESH20: { type: 'percent', value: 20, minOrder: 300, description: '20% off on orders above ₹300 (up to ₹150)' },
  NITYO50: { type: 'flat', value: 50, minOrder: 250, description: '₹50 flat discount on orders above ₹250' },
  WELCOME: { type: 'flat', value: 100, minOrder: 500, description: '₹100 flat welcome discount above ₹500' },
};

export const FREE_DELIVERY_THRESHOLD = 499;
export const STANDARD_DELIVERY_FEE = 49;

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * Math.max(0, item.quantity), 0);
}

export function calculateTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
}

export function applyPromoCode(code: string, subtotal: number): PromoCodeResult {
  const upperCode = code.trim().toUpperCase();
  const promo = VALID_PROMO_CODES[upperCode];

  if (!promo) {
    return {
      valid: false,
      code: upperCode,
      discountAmount: 0,
      message: 'Invalid promo code. Try FRESH20 or NITYO50.',
    };
  }

  if (subtotal < promo.minOrder) {
    return {
      valid: false,
      code: upperCode,
      discountAmount: 0,
      message: `Minimum order amount of ₹${promo.minOrder} required for ${upperCode}.`,
    };
  }

  let discount = 0;
  if (promo.type === 'percent') {
    discount = Math.min(150, Math.round((subtotal * promo.value) / 100));
  } else {
    discount = promo.value;
  }

  return {
    valid: true,
    code: upperCode,
    discountAmount: discount,
    message: `${promo.description} applied!`,
  };
}

export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return STANDARD_DELIVERY_FEE;
}

export function calculateGST(subtotalAfterDiscount: number): number {
  // 5% standard GST on processed groceries
  return Math.round(subtotalAfterDiscount * 0.05);
}

export function calculateFinalTotal(params: {
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  tipAmount?: number;
}): { subtotal: number; discount: number; delivery: number; gst: number; tip: number; total: number } {
  const { subtotal, discountAmount, deliveryFee, tipAmount = 0 } = params;
  const taxable = Math.max(0, subtotal - discountAmount);
  const gst = calculateGST(taxable);
  const total = taxable + deliveryFee + gst + tipAmount;

  return {
    subtotal,
    discount: discountAmount,
    delivery: deliveryFee,
    gst,
    tip: tipAmount,
    total: Math.max(0, total),
  };
}

export function formatIndianCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function validateReservationBooking(booking: {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
}): { valid: boolean; error?: string } {
  if (!booking.name || booking.name.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name' };
  }
  const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    return { valid: false, error: 'Please enter a valid 10-digit mobile number' };
  }
  if (!booking.date) {
    return { valid: false, error: 'Please select a reservation date' };
  }
  if (!booking.timeSlot) {
    return { valid: false, error: 'Please select a preferred time slot' };
  }
  return { valid: true };
}
