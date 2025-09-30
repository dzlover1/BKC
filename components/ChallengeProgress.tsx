import React from 'react';

interface ChallengeProgressProps {
  currentWeek: number;
  totalWeeks: number;
}

const ChallengeProgress: React.FC<ChallengeProgressProps> = ({ currentWeek, totalWeeks }) => {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your 6-Week Challenge Progress</h3>
      <div className="flex items-center justify-between">
        {weeks.map((week, index) => {
          const isCompleted = week < currentWeek;
          const isCurrent = week === currentWeek;

          let statusClasses = '';
          if (isCompleted) {
            statusClasses = 'bg-green-500 text-black';
          } else if (isCurrent) {
            statusClasses = 'bg-green-200 text-black ring-2 ring-green-500';
          } else {
            statusClasses = 'bg-gray-200 text-black';
          }

          return (
            <React.Fragment key={week}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${statusClasses} transition-all duration-300`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    week
                  )}
                </div>
                <span className="text-xs mt-2 text-black font-medium">Week {week}</span>
              </div>
              {index < totalWeeks - 1 && <div className="flex-1 h-1 bg-gray-200 mx-2 rounded-full"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeProgress;