import { create } from 'zustand';
import { Contest, ContestFilters } from '../types/contest';

interface ContestStore {
  contests: Contest[];
  bookmarkedContests: Set<string>;
  filters: ContestFilters;
  setContests: (contests: Contest[]) => void;
  toggleBookmark: (contestId: string) => void;
  updateFilters: (filters: Partial<ContestFilters>) => void;
  setSolutionUrl: (contestId: string, url: string) => void;
}

export const useContestStore = create<ContestStore>((set) => ({
  contests: [],
  bookmarkedContests: new Set(),
  filters: {
    platforms: {
      codeforces: true,
      codechef: true,
      leetcode: true,
    },
    showPastContests: false,
  },
  setContests: (contests) => set({ contests }),
  toggleBookmark: (contestId) =>
    set((state) => {
      const newBookmarks = new Set(state.bookmarkedContests);
      if (newBookmarks.has(contestId)) {
        newBookmarks.delete(contestId);
      } else {
        newBookmarks.add(contestId);
      }
      return { bookmarkedContests: newBookmarks };
    }),
  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setSolutionUrl: (contestId, url) =>
    set((state) => ({
      contests: state.contests.map((contest) =>
        contest.id === contestId ? { ...contest, solutionUrl: url } : contest
      ),
    })),
}));