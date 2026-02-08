import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserType {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'rider';
  address: string;
}

interface SignupPageProps {
  onSignup: (user: UserType) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] =
    useState<'customer' | 'vendor' | 'rider'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      phone,
      role: selectedRole,
      address: 'Mumbai, Maharashtra',
    };

    onSignup(user);

    // ✅ ROLE BASED REDIRECT
    if (user.role === 'vendor') navigate('/vendor');
    else if (user.role === 'rider') navigate('/rider');
    else navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent mb-2">
            स्वदेशी Mart
          </h1>
          <p className="text-gray-600">
            Create your account to get started.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-[#FF9933]/20 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Sign Up
          </h2>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Register as
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  selectedRole === 'customer'
                    ? 'border-[#FF9933] bg-[#FFF5E6] text-[#FF9933]'
                    : 'border-gray-200 text-gray-600 hover:border-[#FF9933]/50'
                }`}
              >
                <div className="text-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-1" fill="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20 C4 16 8 14 12 14 C16 14 20 16 20 20" />
                  </svg>
                  <span className="text-xs font-medium">Customer</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('vendor')}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  selectedRole === 'vendor'
                    ? 'border-[#FF9933] bg-[#FFF5E6] text-[#FF9933]'
                    : 'border-gray-200 text-gray-600 hover:border-[#FF9933]/50'
                }`}
              >
                <div className="text-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-1" fill="currentColor">
                    <rect x="3" y="9" width="18" height="12" rx="1" />
                    <path d="M3 9 L12 3 L21 9" />
                  </svg>
                  <span className="text-xs font-medium">Vendor</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('rider')}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  selectedRole === 'rider'
                    ? 'border-[#FF9933] bg-[#FFF5E6] text-[#FF9933]'
                    : 'border-gray-200 text-gray-600 hover:border-[#FF9933]/50'
                }`}
              >
                <div className="text-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-1" fill="currentColor">
                    <circle cx="8" cy="17" r="2" />
                    <circle cx="18" cy="17" r="2" />
                    <path d="M6 17 L6 12 L10 12 L14 8 L20 8 L20 17" />
                  </svg>
                  <span className="text-xs font-medium">Rider</span>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF9933] hover:bg-[#e8892d] text-white font-medium rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#FF9933] hover:text-[#e8892d] font-medium"
              >
                Login
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
