import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Calendar, User, Home, ChevronRight } from 'lucide-react';
import Orders from './Orders';
import Schedule from './Schedule';
import Profile from './Profile';
import PointsDisplay from './PointsDisplay';
import EmailVerification from './EmailVerification';
import { useAuth } from '../../context/AuthContext';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
      navigate('/portal');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const tabs = [
    { path: '/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  // Get current page name from pathname
  const getCurrentPageName = () => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1) : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className="grid gap-6 mb-8">
          {/* Welcome Banner with Tabs */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome Back</h1>
              <div className="flex items-center text-emerald-100 text-sm lg:text-base">
                <Home className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>{getCurrentPageName()}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tabs.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={`/portal/dashboard${path}`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname.includes(path)
                      ? 'bg-white text-emerald-600 shadow-md'
                      : 'bg-emerald-500/20 text-white hover:bg-emerald-500/30'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 text-white hover:bg-red-500/30 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Email Verification Banner */}
          <EmailVerification />

          {/* Points Display */}
          <PointsDisplay />
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
