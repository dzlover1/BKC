import React from 'react';
import type { WeeklyEntry } from '../types';

interface CurrentStatsProps {
  latest: WeeklyEntry | null;
  previous: WeeklyEntry | null;
}

const getChange = (current?: number, previous?: number): { text: string; color: string; value: number | null } => {
  if (typeof current !== 'number' || typeof previous !== 'number') {
    return { text: '-', color: 'text-gray-500', value: null };
  }
  const change = current - previous;
  if (change < 0) return { text: `▾ ${Math.abs(change).toFixed(1)}`, color: 'text-green-600', value: change };
  if (change > 0) return { text: `▴ ${change.toFixed(1)}`, color: 'text-red-600', value: change };
  return { text: '0', color: 'text-gray-500', value: 0 };
};


const StatItem: React.FC<{ label: string; value: string; unit: string; change: { text: string; color: string } }> = ({ label, value, unit, change }) => (
  <div className="flex justify-between items-baseline">
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">
        {value}
        {unit && <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>}
      </p>
    </div>
    <p className={`text-lg font-semibold ${change.color}`}>{change.text}</p>
  </div>
);

const getBMIStyle = (bmi: number | null): { category: string; textColor: string; bgColor: string } => {
    if (bmi === null || bmi <= 0) return { category: 'N/A', textColor: 'text-gray-500', bgColor: 'bg-gray-100' };
    if (bmi < 18.5) return { category: 'Underweight', textColor: 'text-blue-800', bgColor: 'bg-blue-100' };
    if (bmi < 25) return { category: 'Normal', textColor: 'text-green-800', bgColor: 'bg-green-100' };
    if (bmi < 30) return { category: 'Overweight', textColor: 'text-yellow-800', bgColor: 'bg-yellow-100' };
    return { category: 'Obese', textColor: 'text-red-800', bgColor: 'bg-red-100' };
};

const CurrentStats: React.FC<CurrentStatsProps> = ({ latest, previous }) => {
  const weightChange = getChange(latest?.weightKg, previous?.weightKg);
  const bmiChange = getChange(latest?.bmi, previous?.bmi);
  const bodyFatChange = getChange(latest?.bodyFatPercentage, previous?.bodyFatPercentage);
  const muscleMassChange = getChange(latest?.muscleMassKg, previous?.muscleMassKg);
  const visceralFatChange = getChange(latest?.visceralFatLevel, previous?.visceralFatLevel);
  
  const bmiStyle = getBMIStyle(latest?.bmi ?? null);


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Stats</h3>
      {latest ? (
        <div className="space-y-4">
          <StatItem label="Weight" value={latest.weightKg.toFixed(1)} unit="kg" change={weightChange} />
          <hr/>
          
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-sm font-medium text-gray-500">BMI</p>
              <div className="flex items-baseline space-x-2">
                <p className={`text-2xl font-bold ${bmiStyle.textColor}`}>
                  {latest.bmi.toFixed(1)}
                </p>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${bmiStyle.bgColor} ${bmiStyle.textColor}`}>
                    {bmiStyle.category}
                </span>
              </div>
            </div>
            <p className={`text-lg font-semibold ${bmiChange.color}`}>{bmiChange.text}</p>
          </div>

          <hr/>
          <StatItem label="Body Fat" value={latest.bodyFatPercentage?.toFixed(1) ?? '-'} unit="%" change={bodyFatChange} />
          <hr/>
          <StatItem label="Muscle Mass" value={latest.muscleMassKg?.toFixed(1) ?? '-'} unit="kg" change={muscleMassChange} />
          <hr/>
          <StatItem label="Visceral Fat" value={latest.visceralFatLevel?.toString() ?? '-'} unit="" change={visceralFatChange} />
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">Log your first week to see your stats.</p>
      )}
    </div>
  );
};

export default CurrentStats;