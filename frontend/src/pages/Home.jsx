import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-neutral-dark">
          Find Your Space, <br className="hidden md:block" />
          <span className="text-primary">
            Effortlessly.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-neutral mb-10 max-w-2xl mx-auto leading-relaxed">
          SmartPark connects you to available parking spots in real-time. No more circling the block. Reserve your spot and arrive stress-free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dashboard" className="px-8 py-3 rounded-xl bg-primary hover:bg-blue-700 text-white transition-all font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 inline-block">
            Find Parking
          </Link>
          <button className="px-8 py-3 rounded-xl bg-white text-neutral-dark hover:bg-gray-50 border border-gray-200 transition-all font-semibold shadow-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

