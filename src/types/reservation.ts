export type ReservationCategory = 'harvest_slot' | 'tasting_table' | 'farm_batch';

export interface ReservationSlot {
  id: string;
  category: ReservationCategory;
  title: string;
  subtitle: string;
  image: string;
  priceNote: string;
  badge: string;
  duration: string;
  description: string;
  availableTimes: string[];
  maxCapacity: number;
}

export const RESERVATION_EXPERIENCES: ReservationSlot[] = [
  {
    id: 'harvest-dawn',
    category: 'harvest_slot',
    title: 'Dawn Harvest Priority Delivery Window',
    subtitle: 'Harvested at 4:30 AM • At your doorstep by 7:30 AM',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    priceNote: 'Complimentary on orders above ₹499',
    badge: 'Limited to 30 Homes / Morning',
    duration: 'Reserved 60-min window',
    description: 'Guaranteed temperature-controlled delivery within 3 hours of plucking. Your basket skips warehouse sorting and journeys straight from farm gates to your kitchen table.',
    availableTimes: ['6:30 AM - 7:30 AM', '7:30 AM - 8:30 AM', '8:30 AM - 9:30 AM', '11:00 AM - 12:30 PM', '5:00 PM - 6:30 PM'],
    maxCapacity: 6
  },
  {
    id: 'tasting-table',
    category: 'tasting_table',
    title: 'Artisan Gourmet Tasting & Cheese Table',
    subtitle: 'Flagship store private tasting • Chef guided pairings',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    priceNote: '₹450 / guest (Redeemable against grocery purchases)',
    badge: 'Sommelier & Fromager Guided',
    duration: '45 minutes',
    description: 'Immerse your senses in single-origin extra virgin olive oils, aged cave cheeses, raw forest honeys, and freshly baked sourdough slices guided by our master food curators.',
    availableTimes: ['11:30 AM', '02:30 PM', '04:30 PM', '06:30 PM', '08:00 PM'],
    maxCapacity: 8
  },
  {
    id: 'batch-alphonso',
    category: 'farm_batch',
    title: 'Seasonal Ratnagiri First-Crate Allocation',
    subtitle: 'Direct allocation of the season’s prized 1st flowering batch',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    priceNote: 'Pre-book allocation • Lock-in guaranteed crate',
    badge: 'Only 85 Crates Allocated',
    duration: 'Scheduled Dispatch Date',
    description: 'Secure your family’s crate from the historic Devgad coastal groves before the open market opens. Tree-ripened on organic rice hay, individually numbered with grower seal.',
    availableTimes: ['Next Saturday Dispatch', 'Next Tuesday Dispatch', 'Weekend Special Dispatch'],
    maxCapacity: 10
  }
];

export interface ConfirmedReservation {
  bookingId: string;
  experienceId: string;
  experienceTitle: string;
  category: ReservationCategory;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsOrQuantity: number;
  specialRequests?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}
