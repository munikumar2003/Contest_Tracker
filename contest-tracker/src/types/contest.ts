export interface Contest {
  id: string;
  name: string;
  platform: 'codeforces' | 'codechef' | 'leetcode';
  startTime: string;
  duration: number;
  url: string;
  isBookmarked?: boolean;
  solutionUrl?: string;
}

export interface ContestFilters {
  platforms: {
    codeforces: boolean;
    codechef: boolean;
    leetcode: boolean;
  };
  showPastContests: boolean;
}