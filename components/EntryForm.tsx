import React, { useState } from 'react';
import WeightIcon from './icons/WeightIcon';
import BodyFatIcon from './icons/BodyFatIcon';
import MuscleIcon from './icons/MuscleIcon';
import VisceralFatIcon from './icons/VisceralFatIcon';

interface EntryData {
  weightKg: number;
  bodyFatPercentage?: number;
  muscleMassKg?: number;
  visceralFatLevel?: number;
}

interface EntryFormProps {
  nextWeek: number;
  onAddEntry: (data: EntryData) => void;
  challengeDuration: number;
}

const EntryForm: React.FC<EntryFormProps> = ({ nextWeek, onAddEntry, challengeDuration }) => {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [visceralFat, setVisceralFat] = useState('');
  const [error, setError] = useState('');

  const isChallengeComplete = nextWeek > challengeDuration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isChallengeComplete) return;

    const weightKg = parseFloat(weight);
    if (weightKg > 0) {
      onAddEntry({
        weightKg,
        bodyFatPercentage: bodyFat ? parseFloat(bodyFat) : undefined,
        muscleMassKg: muscleMass ? parseFloat(muscleMass) : undefined,
        visceralFatLevel: visceralFat ? parseInt(visceralFat, 10) : undefined,
      });
      setWeight('');
      setBodyFat('');
      setMuscleMass('');
      setVisceralFat('');
      setError('');
    } else {
        setError('Please enter a valid weight.');
    }
  };

  if (isChallengeComplete) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <img src="https://em-content.zobj.net/source/microsoft-teams/363/partying-face_1f973.png" alt="Party" className="w-20 h-20 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-600">Challenge Complete!</h3>
        <p className="text-gray-600 mt-2">Congratulations on finishing your 6-week Bodykey journey! Check out your final progress.</p>
      </div>
    );
  }

  const inputClass = "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">Log Week {nextWeek} of {challengeDuration}</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="weight" className="text-sm font-medium text-gray-700">Current Weight (kg)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <WeightIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input id="weight" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 75.5" required className={inputClass} />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div>
            <label htmlFor="bodyFat" className="text-sm font-medium text-gray-700">Body Fat (%) <span className="text-gray-400">(Optional)</span></label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BodyFatIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="bodyFat" type="number" step="0.1" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="e.g., 22.5" className={inputClass} />
            </div>
        </div>

        <div>
            <label htmlFor="muscleMass" className="text-sm font-medium text-gray-700">Muscle Mass (kg) <span className="text-gray-400">(Optional)</span></label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MuscleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="muscleMass" type="number" step="0.1" value={muscleMass} onChange={(e) => setMuscleMass(e.target.value)} placeholder="e.g., 55.2" className={inputClass} />
            </div>
        </div>

        <div>
            <label htmlFor="visceralFat" className="text-sm font-medium text-gray-700">Visceral Fat <span className="text-gray-400">(Optional)</span></label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <VisceralFatIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="visceralFat" type="number" step="1" value={visceralFat} onChange={(e) => setVisceralFat(e.target.value)} placeholder="e.g., 8" className={inputClass} />
            </div>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Add Log
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
