import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      navigate(location.state?.from?.pathname || '/map', { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      navigate(location.state?.from?.pathname || '/map', { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[#F8FAFC] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create Account</h2>
              <p className="text-slate-500 font-medium text-sm">Join SmartPark and find parking effortlessly</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 font-medium"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 font-medium"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 font-medium"
                  placeholder="Create a strong password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 font-medium"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-start ml-1 mt-6">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-slate-600 font-medium">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-200 hover:translate-y-[-2px] transition-all disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full mt-8 py-3.5 px-4 bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-3 transition-all text-slate-700 font-bold disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <div className="mt-8 text-center">
              <p className="text-slate-500 font-medium text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors ml-1">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
