import React, { useState } from 'react';
import { useContestStore } from '../store/useContestStore';

const AdminPanel = () => {
  const { contests, setSolutionUrl } = useContestStore();
  const [selectedContest, setSelectedContest] = useState('');
  const [solutionUrl, setSolutionUrlInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContest && solutionUrl) {
      setSolutionUrl(selectedContest, solutionUrl);
      setSelectedContest('');
      setSolutionUrlInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Add Solution Links
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="contest"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Contest
          </label>
          <select
            id="contest"
            value={selectedContest}
            onChange={(e) => setSelectedContest(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a contest...</option>
            {contests.map((contest) => (
              <option key={contest.id} value={contest.id}>
                {contest.name} ({contest.platform})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="solutionUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Solution URL
          </label>
          <input
            type="url"
            id="solutionUrl"
            value={solutionUrl}
            onChange={(e) => setSolutionUrlInput(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedContest || !solutionUrl}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Solution Link
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;