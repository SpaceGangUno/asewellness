import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserData } from '../../hooks/useFirestore';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';
import * as firestoreService from '../../services/firestore';
import type { User as UserType } from '../../types/models';

export default function Profile() {
  const { user } = useAuth();
  const { userData, loading } = useUserData();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Update profile state when userData or user changes
  useEffect(() => {
    if (userData || user) {
      setProfile({
        name: userData?.name || user?.displayName || '',
        email: userData?.email || user?.email || '',
        phone: userData?.phone || '',
        address: userData?.address || ''
      });

      // If there's an existing address, mark it as selected
      if (userData?.address) {
        setIsAddressSelected(true);
      }
    }
  }, [userData, user]);

  // Initialize address autocomplete
  const { error: autocompleteError } = useAddressAutocomplete(addressInputRef, (result) => {
    console.log('Address selected:', result);
    setProfile(prev => ({
      ...prev,
      address: result.formattedAddress
    }));
    setIsAddressSelected(true);
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, address: e.target.value }));
    setIsAddressSelected(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate required fields
    if (!profile.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!profile.address.trim()) {
      setError('Address is required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // Create initial user data if it doesn't exist
      const updates: Partial<UserType> = {
        id: user.uid,
        name: profile.name.trim(),
        email: user.email || profile.email.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
        points: userData?.points || 0,
      };

      await firestoreService.createUser(user.uid, updates);
      
      // Show success message
      setError('Profile updated successfully!');
      setTimeout(() => setError(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {!user?.emailVerified && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl">
          <p>Please verify your email address to access all features. Check your inbox for the verification link.</p>
          <p className="mt-2">You can still update your profile information while waiting for verification.</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-emerald-900">My Profile</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
            <Shield className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {error && (
            <div className={`mb-4 p-4 rounded-xl ${
              error.includes('success')
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {error}
            </div>
          )}

          {autocompleteError && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-xl">
              Address suggestions are currently unavailable. You can still type your address manually.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={addressInputRef}
                    type="text"
                    value={profile.address}
                    onChange={handleAddressChange}
                    placeholder="Start typing your address..."
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      isAddressSelected ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {autocompleteError 
                    ? "Enter your full address including street, city, state, and ZIP code"
                    : isAddressSelected
                      ? "✓ Address selected"
                      : "Start typing to see address suggestions"}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {isSaving ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Points & Rewards</h3>
            <div className="bg-white rounded-lg p-4 border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Current Points</span>
                <span className="text-emerald-600 text-lg font-bold">{userData?.points || 0}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${Math.min(((userData?.points || 0) / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Next reward at 1,000 points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
