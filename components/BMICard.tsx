import React from 'react';

interface BMICardProps {
  bmi: number | null;
}

const getBMIStyle = (bmi: number | null): { category: string; textColor: string; bgColor: string } => {
  if (bmi === null || bmi <= 0) return { category: 'N/A', textColor: 'text-gray-500', bgColor: 'bg-gray-100' };
  if (bmi < 18.5) return { category: 'Underweight', textColor: 'text-blue-800', bgColor: 'bg-blue-100' };
  if (bmi < 25) return { category: 'Normal', textColor: 'text-green-800', bgColor: 'bg-green-100' };
  if (bmi < 30) return { category: 'Overweight', textColor: 'text-yellow-800', bgColor: 'bg-yellow-100' };
  return { category: 'Obese', textColor: 'text-red-800', bgColor: 'bg-red-100' };
};

const BMICard: React.FC<BMICardProps> = ({ bmi }) => {
  const { category, textColor, bgColor } = getBMIStyle(bmi);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium text-gray-500">Current BMI</h3>
      <p className={`text-5xl font-bold my-2 ${textColor}`}>
        {bmi !== null ? bmi.toFixed(1) : '-'}
      </p>
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColor} ${textColor}`}>
        {category}
      </span>
    </div>
  );
};

export default BMICard;