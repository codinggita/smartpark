import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react';
import heroCar from '../assets/hero_car.png';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest mb-8 animate-bounce">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                Now Live in 50+ Cities
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
                Parking, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-700">Reimagined.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                End the cycle of circling. SmartPark delivers real-time visibility into parking availability and premium valet services at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group">
                  Reserve Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-900 font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center">
                  Join Platform
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-6" alt="Amazon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-6" alt="Google" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="h-6" alt="Netflix" />
              </div>
            </div>

            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] rotate-3 scale-105 opacity-10 group-hover:rotate-6 transition-transform duration-700"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] border-8 border-white">
                <img 
                  src={heroCar} 
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                  alt="Premium SmartPark Car" 
                />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Saved</p>
                    <p className="text-xl font-black text-slate-900">1.2M Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Shield className="text-indigo-600" size={32} />}
              title="Secured Parking"
              desc="Military-grade security surveillance for every reserved spot and valet session."
            />
            <FeatureCard 
              icon={<Zap className="text-indigo-600" size={32} />}
              title="Instant Booking"
              desc="Zero friction. Reserve, pay, and park in under 60 seconds with our optimized flow."
            />
            <FeatureCard 
              icon={<Clock className="text-indigo-600" size={32} />}
              title="Real-time Tracking"
              desc="Watch your valet in real-time. Know exactly where your vehicle is, always."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-200/20 transition-all duration-300 group">
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;

