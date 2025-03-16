import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, isPast, format, isAfter } from 'date-fns';
import { BookmarkPlus, BookmarkCheck, ExternalLink, Clock, History, CalendarClock } from 'lucide-react';
import { useContestStore } from '../store/useContestStore';
import { fetchAllContests } from '../services/api';
import ContestFilters from './ContestFilters';

const ContestList = () => {
  const { contests, bookmarkedContests, filters, setContests, toggleBookmark } = useContestStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      const allContests = await fetchAllContests();
      setContests(allContests);
      setLoading(false);
    };

    fetchContests();
    // Refresh contests every 5 minutes
    const interval = setInterval(fetchContests, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [setContests]);

  const filteredContests = contests.filter((contest) => {
    const isPastContest = isPast(new Date(contest.startTime));
    if (!filters.showPastContests && isPastContest) return false;
    return filters.platforms[contest.platform];
  });

  const { upcomingContests, pastContests } = filteredContests.reduce(
    (acc, contest) => {
      const startDate = new Date(contest.startTime);
      const endDate = new Date(startDate.getTime() + contest.duration * 60 * 1000);
      
      if (isAfter(startDate, new Date())) {
        acc.upcomingContests.push(contest);
      } else {
        acc.pastContests.push(contest);
      }
      return acc;
    },
    { upcomingContests: [], pastContests: [] }
  );

  // Sort contests by start time
  upcomingContests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  pastContests.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'codeforces':
        return 'text-red-600 dark:text-red-400';
      case 'leetcode':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'codechef':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderContestCard = (contest: any) => {
    const startDate = new Date(contest.startTime);
    const isPastContest = isPast(startDate);
    const platformColor = getPlatformColor(contest.platform);
    const endDate = new Date(startDate.getTime() + contest.duration * 60 * 1000);

    return (
      <div
        key={contest.id}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg border-l-4 ${
          isPastContest ? 'border-gray-300 dark:border-gray-600' : 'border-blue-500'
        }`}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {contest.name}
          </h3>
          <button
            onClick={() => toggleBookmark(contest.id)}
            className="text-gray-500 hover:text-yellow-500 transition-colors"
            aria-label={bookmarkedContests.has(contest.id) ? "Remove bookmark" : "Add bookmark"}
          >
            {bookmarkedContests.has(contest.id) ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <div className="mt-4 space-y-3">
          <p className={`text-sm font-medium ${platformColor} flex items-center gap-2`}>
            {contest.platform.charAt(0).toUpperCase() + contest.platform.slice(1)}
          </p>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{format(startDate, 'PPP p')}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <History className="w-4 h-4" />
            <span>
              {isPastContest 
                ? `Ended ${formatDistanceToNow(endDate, { addSuffix: true })}` 
                : formatDistanceToNow(startDate, { addSuffix: true })}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CalendarClock className="w-4 h-4" />
            <span>
              Duration: {Math.floor(contest.duration / 60)} hours {contest.duration % 60} minutes
            </span>
          </div>
          
          <div className="pt-2">
            <a
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Contest <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ContestFilters />
      
      {upcomingContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Upcoming Contests
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingContests.map(renderContestCard)}
          </div>
        </div>
      )}

      {filters.showPastContests && pastContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Past Contests
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastContests.map(renderContestCard)}
          </div>
        </div>
      )}

      {filteredContests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No contests found for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContestList;