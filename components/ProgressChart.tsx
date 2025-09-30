import React from 'react';
import type { WeeklyEntry } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressChartProps {
  data: WeeklyEntry[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  if (data.length < 2) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress Chart</h3>
        <p className="text-gray-500">Log at least two weeks of data to see your progress chart.</p>
      </div>
    );
  }

  const chartMargin = { top: 5, right: 20, left: -10, bottom: 5 };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Progress Chart</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-center text-gray-600 mb-2">Weight (kg) Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={chartMargin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="font-medium text-center text-gray-600 mb-2">BMI Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="bmi" name="BMI" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="font-medium text-center text-gray-600 mb-2">Body Fat (%) Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={chartMargin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Legend />
              <Line connectNulls type="monotone" dataKey="bodyFatPercentage" name="Body Fat (%)" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="font-medium text-center text-gray-600 mb-2">Muscle Mass (kg) Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={chartMargin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Legend />
              <Line connectNulls type="monotone" dataKey="muscleMassKg" name="Muscle Mass (kg)" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
