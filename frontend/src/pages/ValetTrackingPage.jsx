import React, { useState, useEffect } from 'react';
import { Car, MapPin, PhoneCall, Star, CheckCircle2, Clock, Navigation } from 'lucide-react';

const trackingSteps = [
  { id: 1, title: 'Request Received', description: 'We are locating a valet for you.' },
  { id: 2, title: 'Valet Assigned', description: 'Rahul is on his way to your location.' },
  { id: 3, title: 'Vehicle Picked Up', description: 'Your car is being driven to the VIP zone.' },
  { id: 4, title: 'Parked Safely', description: 'Your car is secure in Zone A.' },
];

const ValetTrackingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eta, setEta] = useState(5);

  // Simulate tracking progression
  useEffect(() => {
    if (currentStep >= trackingSteps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setEta(prev => Math.max(0, prev - 1));
    }, 4000); // Progress every 4 seconds for demo purposes

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-dark">Valet Tracking</h1>
        <p className="text-neutral mt-1">Real-time updates on your vehicle</p>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tracking Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep / trackingSteps.length) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center mb-8 mt-4">
              <h2 className="text-xl font-bold text-neutral-dark flex items-center gap-2">
                <Navigation className="text-primary" size={24} />
                Live Status
              </h2>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <Clock size={16} />
                {currentStep < 4 ? `ETA: ${eta} mins` : 'Completed'}
              </div>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {trackingSteps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="relative flex items-start gap-6">
                    <div className={`absolute left-[-2rem] w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500 z-10
                      ${isCompleted ? 'bg-primary text-white' : 
                        isCurrent ? 'bg-white border-primary text-primary animate-pulse' : 
                        'bg-slate-100 text-slate-300'}`}
                    >
                      {isCompleted ? <CheckCircle2 size={16} /> : <div className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-primary' : 'bg-slate-300'}`} />}
                    </div>
                    <div className={`flex-1 p-5 rounded-2xl border transition-all duration-500
                      ${isCurrent ? 'border-primary/30 bg-primary/5 shadow-md scale-[1.02]' : 'border-gray-100 bg-white'}`}
                    >
                      <h3 className={`font-bold ${isCurrent ? 'text-primary' : isCompleted ? 'text-neutral-dark' : 'text-slate-400'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mt-1 ${isCurrent ? 'text-slate-700' : 'text-slate-400'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Valet Profile & Vehicle Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Driver Profile */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-lg">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Valet Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-bold text-xl text-neutral-dark">Rahul Sharma</h3>
            <p className="text-sm text-neutral">Your VIP Valet</p>
            
            <div className="flex gap-1 mt-3 text-accent">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p className="text-xs text-slate-500 mt-1">4.9 (124 reviews)</p>

            <button className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 text-neutral-dark font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <PhoneCall size={18} />
              Contact Driver
            </button>
          </div>

          {/* Vehicle Info */}
          <div className="bg-neutral-dark text-white p-6 rounded-3xl shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Car size={20} className="text-primary" />
              Vehicle Info
            </h3>
            <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
              <p className="text-xs text-white/60 uppercase tracking-wider mb-1">License Plate</p>
              <h2 className="text-2xl font-mono font-bold tracking-widest text-accent">DL01 AB1234</h2>
            </div>
            
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/60">Parking Zone</span>
                <span className="font-semibold text-primary">VIP Valet</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/60">Request Time</span>
                <span className="font-semibold">Today, 2:45 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Booking ID</span>
                <span className="font-mono text-white/80">#SP-9824A</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ValetTrackingPage;
