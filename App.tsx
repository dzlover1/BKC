import React, { useState, useEffect, useCallback } from 'react';
import type { UserProfile, WeeklyEntry, AllProfiles, AllEntries } from './types';
import ProfileSetup from './components/ProfileSetup';
import CurrentStats from './components/CurrentStats';
import ProgressChart from './components/ProgressChart';
import ProgressLog from './components/ProgressLog';
import EntryForm from './components/EntryForm';
import ChallengeProgress from './components/ChallengeProgress';

const CHALLENGE_WEEKS = 6;

interface NewEntryData {
    weightKg: number;
    bodyFatPercentage?: number;
    muscleMassKg?: number;
    visceralFatLevel?: number;
}

const App: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<AllProfiles>({});
  const [allEntries, setAllEntries] = useState<AllEntries>({});

  useEffect(() => {
    try {
      const storedProfiles = localStorage.getItem('allUserProfiles');
      const loadedProfiles = storedProfiles ? JSON.parse(storedProfiles) : {};
      setAllProfiles(loadedProfiles);

      const storedEntries = localStorage.getItem('allWeeklyEntries');
      const loadedEntries = storedEntries ? JSON.parse(storedEntries) : {};
      setAllEntries(loadedEntries);

      const currentProfileName = localStorage.getItem('currentProfileName');
      if (currentProfileName && loadedProfiles[currentProfileName]) {
        setCurrentProfile(loadedProfiles[currentProfileName]);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('allUserProfiles', JSON.stringify(allProfiles));
  }, [allProfiles]);

  useEffect(() => {
    localStorage.setItem('allWeeklyEntries', JSON.stringify(allEntries));
  }, [allEntries]);

  const handleProfileSave = (newProfile: UserProfile) => {
    const updatedProfiles = { ...allProfiles, [newProfile.name]: newProfile };
    setAllProfiles(updatedProfiles);
    setCurrentProfile(newProfile);
    localStorage.setItem('currentProfileName', newProfile.name);
  };
  
  const calculateBmi = useCallback((weightKg: number, heightCm: number): number => {
    if (heightCm <= 0) return 0;
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  }, []);

  const handleAddEntry = (data: NewEntryData) => {
    if (!currentProfile) return;

    const userEntries = allEntries[currentProfile.name] || [];
    const sorted = [...userEntries].sort((a, b) => b.week - a.week);
    const nextWeek = sorted.length > 0 ? sorted[0].week + 1 : 1;

    if (nextWeek > CHALLENGE_WEEKS) {
        console.warn("Attempted to add an entry beyond the challenge duration.");
        return;
    }

    const newEntry: WeeklyEntry = {
      id: Date.now(),
      week: nextWeek,
      weightKg: data.weightKg,
      bmi: calculateBmi(data.weightKg, currentProfile.heightCm),
      bodyFatPercentage: data.bodyFatPercentage,
      muscleMassKg: data.muscleMassKg,
      visceralFatLevel: data.visceralFatLevel,
    };
    
    const updatedEntries = { ...allEntries, [currentProfile.name]: [...userEntries, newEntry] };
    setAllEntries(updatedEntries);
  };
  
  const handleDeleteEntry = (id: number) => {
    if (!currentProfile) return;
    const userEntries = allEntries[currentProfile.name] || [];
    const updatedUserEntries = userEntries.filter(entry => entry.id !== id);
    const updatedEntries = { ...allEntries, [currentProfile.name]: updatedUserEntries };
    setAllEntries(updatedEntries);
  };
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset ALL data for ALL participants? This cannot be undone.")) {
      localStorage.removeItem('allUserProfiles');
      localStorage.removeItem('allWeeklyEntries');
      localStorage.removeItem('currentProfileName');
      window.location.reload();
    }
  };

  const handleSwitchUser = () => {
    setCurrentProfile(null);
    localStorage.removeItem('currentProfileName');
  };

  if (!currentProfile) {
    return <ProfileSetup onProfileSave={handleProfileSave} allProfiles={allProfiles} />;
  }
  
  const currentUserEntries = allEntries[currentProfile.name] || [];
  const sortedEntries = [...currentUserEntries].sort((a, b) => b.week - a.week);
  const latestEntry = sortedEntries.length > 0 ? sortedEntries[0] : null;
  const previousEntry = sortedEntries.length > 1 ? sortedEntries[1] : null;
  const nextWeekToLog = sortedEntries.length > 0 ? sortedEntries[0].week + 1 : 1;
  const currentWeekForVisualProgress = (latestEntry ? latestEntry.week : 0) + 1;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Hi, {currentProfile.name}!</h1>
                <p className="text-lg text-gray-500 mt-1">Your Bodykey Progress Dashboard</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                    onClick={handleSwitchUser}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Switch User
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    Reset All Data
                </button>
            </div>
        </header>

        <ChallengeProgress currentWeek={currentWeekForVisualProgress} totalWeeks={CHALLENGE_WEEKS} />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <EntryForm nextWeek={nextWeekToLog} onAddEntry={handleAddEntry} challengeDuration={CHALLENGE_WEEKS} />
            <CurrentStats latest={latestEntry} previous={previousEntry} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ProgressChart data={[...sortedEntries].reverse()} />
            <ProgressLog entries={sortedEntries} onDeleteEntry={handleDeleteEntry} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
