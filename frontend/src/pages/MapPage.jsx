import React from 'react';
import { MapPin, Navigation, Car } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">Live Map</h1>
          <p className="text-neutral mt-1">Find parking spots and track your valet</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 text-sm font-semibold text-neutral-dark hover:bg-gray-50 transition-colors">
            <Navigation size={18} className="text-primary" />
            Current Location
          </button>
        </div>
      </div>

      <div className="flex-grow bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner border border-gray-200 flex flex-col items-center justify-center min-h-[500px]">
        {/* Placeholder for actual Google Maps implementation */}
        <MapPin size={48} className="text-primary mb-4 animate-bounce" />
        <h2 className="text-xl font-bold text-slate-600">Map View Simulator</h2>
        <p className="text-slate-500 max-w-md text-center mt-2">
          In a full implementation, this area would render the Google Maps API showing available parking spots, your vehicle location, and valet tracking.
        </p>

        {/* Mock UI Overlays */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white p-5 rounded-2xl shadow-xl shadow-neutral/10 border border-gray-100 z-10">
          <h3 className="font-bold text-neutral-dark flex items-center gap-2 mb-3">
            <Car size={20} className="text-primary" />
            Nearby Parking
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-colors cursor-pointer">
              <div>
                <p className="font-semibold text-sm">Zone A - Level 1</p>
                <p className="text-xs text-neutral">12 spots available</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">Open</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-colors cursor-pointer">
              <div>
                <p className="font-semibold text-sm">VIP Valet Zone</p>
                <p className="text-xs text-neutral">3 spots available</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-lg">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
