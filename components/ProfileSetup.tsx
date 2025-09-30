import React, { useState, useEffect } from 'react';
import type { AllProfiles, UserProfile } from '../types';
import UserIcon from './icons/UserIcon';
import RulerIcon from './icons/RulerIcon';
import { PARTICIPANTS } from '../constants';

interface ProfileSetupProps {
  onProfileSave: (profile: UserProfile) => void;
  allProfiles: AllProfiles;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileSave, allProfiles }) => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [isHeightEditable, setIsHeightEditable] = useState(true);

  useEffect(() => {
    if (name) {
      const existingProfile = allProfiles[name];
      if (existingProfile) {
        setHeight(existingProfile.heightCm.toString());
        setIsHeightEditable(false);
      } else {
        setHeight('');
        setIsHeightEditable(true);
      }
    } else {
        setHeight('');
        setIsHeightEditable(true);
    }
  }, [name, allProfiles]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const heightCm = parseFloat(height);
    if (name && heightCm > 0) {
      onProfileSave({ name, heightCm });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
            <img src="https://www.amway.my/p/en_MY/bodykey-by-nutrilite-logo-1x1.jpg" alt="Bodykey Logo" className="w-24 h-24 mx-auto mb-4 rounded-full"/>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Bodykey Tracker</h1>
            <p className="text-gray-500 mt-2">Select your name to begin tracking.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Select Participant</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="" disabled>-- Select your name --</option>
                {PARTICIPANTS.map((participant) => (
                  <option key={participant} value={participant}>{participant}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RulerIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 170"
                    required
                    min="1"
                    readOnly={!isHeightEditable}
                    className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${!isHeightEditable ? 'bg-gray-100' : ''}`}
                />
            </div>
             {!isHeightEditable && <p className="mt-1 text-xs text-gray-500">Height is already set for this participant.</p>}
          </div>
          <button
            type="submit"
            disabled={!name}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {allProfiles[name] ? 'Go to Dashboard' : 'Save & Start Tracking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
