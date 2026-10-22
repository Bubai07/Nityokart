import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Sparkles, MapPin, Phone, Mail, QrCode, AlertCircle } from 'lucide-react';
import { RESERVATION_EXPERIENCES, ReservationSlot, ConfirmedReservation } from '../types/reservation';
import { validateReservationBooking } from '../utils/cartCalculations';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExperienceId?: string;
  onReservationConfirmed: (reservation: ConfirmedReservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedExperienceId,
  onReservationConfirmed,
}) => {
  const [selectedExp, setSelectedExp] = useState<ReservationSlot>(() => {
    return RESERVATION_EXPERIENCES.find((e) => e.id === selectedExperienceId) || RESERVATION_EXPERIENCES[0];
  });

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(selectedExp.availableTimes[0] || '');
  const [guestCount, setGuestCount] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedReservation | null>(null);

  if (!isOpen) return null;

  const handleSelectExperience = (exp: ReservationSlot) => {
    setSelectedExp(exp);
    setTimeSlot(exp.availableTimes[0]);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateReservationBooking({ name, phone, date, timeSlot });
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please check your inputs.');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for reservation pass.');
      return;
    }

    const newBooking: ConfirmedReservation = {
      bookingId: `NYK-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      experienceId: selectedExp.id,
      experienceTitle: selectedExp.title,
      category: selectedExp.category,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      timeSlot,
      guestsOrQuantity: guestCount,
      specialRequests: specialRequests.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    onReservationConfirmed(newBooking);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-emerald-500/25 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-500/15 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-400">
                Nityokart Reservation System
              </span>
              <h3 className="text-xl font-editorial font-bold text-white">
                Reserve Exclusive Slot or Experience
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                Reservation Confirmed
              </span>
              <h4 className="text-2xl font-editorial font-bold text-white mt-1">
                Your Priority Pass is Ready
              </h4>
              <p className="text-sm text-zinc-400 mt-1">
                Booking Reference: <span className="font-mono font-bold text-amber-400">{confirmedBooking.bookingId}</span>
              </p>
            </div>

            {/* Pass Ticket */}
            <div className="p-5 rounded-xl bg-stone-950 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-emerald-500/20">
                <div>
                  <h5 className="font-editorial text-lg font-bold text-emerald-300">
                    {confirmedBooking.experienceTitle}
                  </h5>
                  <p className="text-xs text-zinc-400 mt-0.5">Guest: {confirmedBooking.name} • {confirmedBooking.phone}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>VIP PASS CONFIRMED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Reserved Date</span>
                  <span className="font-semibold text-white">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Time Slot</span>
                  <span className="font-semibold text-white">{confirmedBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Allocation / Guests</span>
                  <span className="font-semibold text-amber-300">{confirmedBooking.guestsOrQuantity} Pax / Units</span>
                </div>
              </div>

              {confirmedBooking.specialRequests && (
                <div className="mt-3 pt-3 border-t border-emerald-500/10 text-xs">
                  <span className="text-zinc-500">Notes: </span>
                  <span className="text-zinc-300 italic">{confirmedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-center text-zinc-400">
              Confirmation SMS and calendar invite dispatched to <strong>{confirmedBooking.phone}</strong> and <strong>{confirmedBooking.email}</strong>.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
              >
                Done & Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Experience Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                1. Select Reservation Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {RESERVATION_EXPERIENCES.map((exp) => {
                  const isSelected = selectedExp.id === exp.id;
                  return (
                    <button
                      type="button"
                      key={exp.id}
                      onClick={() => handleSelectExperience(exp)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-stone-950/60 border-stone-800 hover:border-emerald-500/30'
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase block">
                        {exp.badge}
                      </span>
                      <h4 className="font-editorial text-sm font-bold text-white mt-0.5 line-clamp-1">
                        {exp.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                        {exp.priceNote}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected experience banner preview */}
            <div className="flex gap-4 p-4 rounded-xl bg-stone-950 border border-emerald-500/20">
              <img
                src={selectedExp.image}
                alt={selectedExp.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-editorial text-base font-bold text-white">
                  {selectedExp.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {selectedExp.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {selectedExp.duration}
                  </span>
                  <span>•</span>
                  <span>{selectedExp.priceNote}</span>
                </div>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Guests / Unit Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                    className="w-10 h-10 rounded-xl bg-stone-950 border border-emerald-500/20 text-white font-bold hover:bg-stone-800"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-white text-sm bg-stone-950 py-2.5 rounded-xl border border-emerald-500/20">
                    {guestCount} {selectedExp.category === 'farm_batch' ? 'Crates' : 'Guests'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => Math.min(selectedExp.maxCapacity, c + 1))}
                    className="w-10 h-10 rounded-xl bg-stone-950 border border-emerald-500/20 text-white font-bold hover:bg-stone-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Available Slots
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedExp.availableTimes.map((slot) => {
                  const isCurrent = timeSlot === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                          : 'bg-stone-950 border border-emerald-500/20 text-zinc-300 hover:border-emerald-400'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1">Email (for pass & QR receipt) *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="priya.sharma@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1">Special Preferences / Dietary Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Gluten-free pairings, or gate entry access code"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-emerald-500/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Secure Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
