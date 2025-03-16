import React from 'react';
import { useContestStore } from '../store/useContestStore';

const ContestFilters = () => {
  const { filters, updateFilters } = useContestStore();

  const togglePlatform = (platform: keyof typeof filters.platforms) => {
    updateFilters({
      platforms: {
        ...filters.platforms,
        [platform]: !filters.platforms[platform],
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {Object.entries(filters.platforms).map(([platform, isEnabled]) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform as keyof typeof filters.platforms)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  isEnabled
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPastContests"
            checked={filters.showPastContests}
            onChange={() => updateFilters({ showPastContests: !filters.showPastContests })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="showPastContests"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            Show past contests
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContestFilters;