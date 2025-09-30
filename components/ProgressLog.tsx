import React from 'react';
import type { WeeklyEntry } from '../types';

interface ProgressLogProps {
  entries: WeeklyEntry[];
  onDeleteEntry: (id: number) => void;
}

const ProgressLog: React.FC<ProgressLogProps> = ({ entries, onDeleteEntry }) => {

  const calculateChange = (index: number) => {
    if (index === entries.length - 1) return { text: '-', color: 'text-gray-500' };
    
    const currentWeight = entries[index].weightKg;
    const previousWeight = entries[index + 1].weightKg;
    const change = currentWeight - previousWeight;
    
    if (change < 0) {
      return { text: `${change.toFixed(1)} kg`, color: 'text-green-600' };
    }
    if (change > 0) {
      return { text: `+${change.toFixed(1)} kg`, color: 'text-red-600' };
    }
    return { text: '0 kg', color: 'text-gray-500' };
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Log</h3>
      <div className="overflow-x-auto">
        {entries.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No entries yet. Add your first week's weight to get started!</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body Fat (%)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Muscle Mass (kg)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visceral Fat</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry, index) => {
                const change = calculateChange(index);
                return (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.week}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.weightKg.toFixed(1)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${change.color}`}>{change.text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.bmi.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.bodyFatPercentage ? entry.bodyFatPercentage.toFixed(1) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.muscleMassKg ? entry.muscleMassKg.toFixed(1) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.visceralFatLevel ?? '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => onDeleteEntry(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProgressLog;
