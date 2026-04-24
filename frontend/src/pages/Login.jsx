import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-neutral/10 border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-neutral-dark mb-2">Welcome Back</h2>
              <p className="text-neutral">Enter your details to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2 ml-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-neutral-dark"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-sm font-semibold text-neutral-dark" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-neutral-dark"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center ml-1">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral font-medium">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-primary hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-100 text-center">
              <p className="text-neutral text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-bold hover:underline ml-1">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
