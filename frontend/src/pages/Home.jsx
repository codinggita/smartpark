import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';
import heroCar from '../assets/hero_car.png';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <Helmet>
        <title>SmartPark — Smart Parking & Valet Visibility</title>
        <meta name="description" content="End the cycle of circling. SmartPark delivers real-time parking availability and premium valet services in 50+ cities." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-bounce ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`}></span>
                Now Live in 50+ Cities
              </div>
              <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Parking, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">Reimagined.</span>
              </h1>
              <p className={`text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                End the cycle of circling. SmartPark delivers real-time visibility into parking availability and premium valet services at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                  Reserve Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-lg border transition-all shadow-sm flex items-center justify-center ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
                  Join Platform
                </Link>
              </div>

              {/* Trust Badge */}
              <div className={`mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all ${isDark ? 'invert' : ''}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-6" alt="Amazon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-6" alt="Google" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="h-6" alt="Netflix" />
              </div>
            </div>

            <div className="lg:w-1/2 relative group">
              <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] rotate-3 scale-105 opacity-10 group-hover:rotate-6 transition-transform duration-700`}></div>
              <div className={`relative rounded-[3rem] overflow-hidden shadow-2xl border-8 ${isDark ? 'border-slate-800 shadow-indigo-900/20' : 'border-white shadow-indigo-200/50'}`}>
                <img
                  src={heroCar}
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  alt="Premium SmartPark Car"
                />
              </div>

              {/* Floating Stat Card */}
              <div className={`absolute -bottom-10 -left-10 p-6 rounded-3xl shadow-2xl border hidden md:block animate-pulse ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Time Saved</p>
                    <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>1.2M Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`py-24 transition-colors ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Shield className="text-indigo-500" size={32} />}
              title="Secured Parking"
              desc="Military-grade security surveillance for every reserved spot and valet session."
              isDark={isDark}
            />
            <FeatureCard
              icon={<Zap className="text-indigo-500" size={32} />}
              title="Instant Booking"
              desc="Zero friction. Reserve, pay, and park in under 60 seconds with our optimized flow."
              isDark={isDark}
            />
            <FeatureCard
              icon={<Clock className="text-indigo-500" size={32} />}
              title="Real-time Tracking"
              desc="Watch your valet in real-time. Know exactly where your vehicle is, always."
              isDark={isDark}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, isDark }) => (
  <div className={`p-10 rounded-[2.5rem] border transition-all duration-300 group ${isDark ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-200/20'}`}>
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className={`text-xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
    <p className={`font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
  </div>
);

export default Home;

