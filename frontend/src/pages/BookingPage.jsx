import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Car, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parkingService, bookingService } from '../services/apiService';

const BookingPage = () => {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    licensePlate: '',
    date: '',
    time: '',
    zone: '', // This will be the zone _id
    duration: 1, // hours
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await parkingService.getZones();
        if (response.success) {
          setZones(response.data);
          // Set default zone to the first one available
          if (response.data.length > 0) {
            setFormData(prev => ({ ...prev, zone: response.data[0]._id }));
          }
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleZoneSelect = (zoneId) => {
    setFormData({ ...formData, zone: zoneId });
  };

  const calculateTotal = () => {
    const selectedZone = zones.find(z => z._id === formData.zone);
    return selectedZone ? selectedZone.pricePerHour * formData.duration : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const totalAmount = calculateTotal();
      const selectedZone = zones.find(z => z._id === formData.zone);
      
      const bookingData = {
        zoneId: formData.zone,
        licensePlate: formData.licensePlate,
        date: formData.date,
        time: formData.time,
        duration: parseInt(formData.duration),
        totalAmount,
      };

      const response = await bookingService.createBooking(bookingData);
      
      if (response.success) {
        // Navigate to Payment page, passing booking details via state
        navigate('/payment', { 
          state: { 
            bookingDetails: { 
              ...formData, 
              _id: response.data._id,
              totalAmount, 
              zoneName: selectedZone?.name,
              zoneType: selectedZone?.type
            } 
          } 
        });
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getZoneIcon = (type) => {
    switch (type) {
      case 'premium': return <ShieldCheck size={24} />;
      case 'valet': return <Clock size={24} />;
      default: return <Car size={24} />;
    }
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      <Helmet>
        <title>Reserve a Parking Spot — SmartPark</title>
        <meta name="description" content="Book your parking spot or valet service in advance. Choose your zone, date, and duration." />
        <meta property="og:title" content="Reserve a Spot — SmartPark" />
        <meta property="og:url" content="https://smartpark.app/booking" />
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-dark">Reserve a Spot</h1>
        <p className="text-neutral mt-1">Book your parking or valet service in advance</p>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-dark mb-6 flex items-center gap-2">
              <Car className="text-primary" size={24} />
              Vehicle Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">License Plate Number</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  placeholder="e.g. DL 01 AB 1234"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Arrival Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Hours)</label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  max="24"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-dark mb-6 flex items-center gap-2">
              <ShieldCheck className="text-primary" size={24} />
              Select Zone
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-40 bg-gray-50 animate-pulse rounded-2xl border border-gray-100"></div>
                ))
              ) : zones.map((zone) => (
                <div
                  key={zone._id}
                  onClick={() => handleZoneSelect(zone._id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.zone === zone._id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    formData.zone === zone._id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getZoneIcon(zone.type)}
                  </div>
                  <h3 className="font-bold text-neutral-dark">{zone.name}</h3>
                  <p className="text-xs text-neutral mt-1">{zone.availableSpots} spots left</p>
                  <div className="mt-3 font-bold text-lg text-primary">₹{zone.pricePerHour}/hr</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-dark text-white p-6 rounded-3xl shadow-xl sticky top-6">
            <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">Zone</span>
                <span className="font-semibold text-right">
                  {zones.find(z => z._id === formData.zone)?.name || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">Duration</span>
                <span className="font-semibold">{formData.duration} {formData.duration > 1 ? 'hours' : 'hour'}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/70">Date</span>
                <span className="font-semibold">{formData.date || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Total Estimated</span>
                <span className="text-3xl font-bold text-accent">₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || loading || !formData.licensePlate || !formData.date || !formData.time}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors group"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard size={20} />
                  Confirm & Pay
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-2 animate-ping" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/50 mt-4">
              Secure booking. You will be redirected to the payment gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
