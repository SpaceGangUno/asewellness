import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/portal/Dashboard';
import AdminDashboard from '../components/portal/AdminDashboard';
import Login from '../components/portal/Login';
import { useAuth } from '../context/AuthContext';

export default function ClientPortal() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900/90 via-blue-900/90 to-blue-950/90 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  // Check if user is admin (hello@asejuices.com)
  const isAdmin = user?.email === 'hello@asejuices.com';

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={isAdmin ? "/portal/admin" : "/portal/dashboard"} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          user && !isAdmin ? (
            <Dashboard onLogout={() => {}} />
          ) : (
            <Navigate to="/portal" replace />
          )
        }
      />
      <Route
        path="/admin"
        element={
          user && isAdmin ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/portal" replace />
          )
        }
      />
    </Routes>
  );
}
