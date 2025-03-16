import axios from 'axios';
import { Contest } from '../types/contest';

// Codeforces API
const fetchCodeforcesContests = async (): Promise<Contest[]> => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list?gym=false');
    return response.data.result.map((contest: any) => ({
      id: `cf_${contest.id}`,
      name: contest.name,
      platform: 'codeforces',
      startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
      duration: contest.durationSeconds / 60, // Convert to minutes
      url: `https://codeforces.com/contest/${contest.id}`,
      status: contest.phase,
    }));
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error);
    return [];
  }
};

// LeetCode API
const fetchLeetCodeContests = async (): Promise<Contest[]> => {
  try {
    const response = await axios.get('http://localhost:5000/api/leetcode-contests');

    return response.data.map((contest: any) => ({
      id: `lc_${contest.titleSlug}`,
      name: contest.title,
      platform: 'leetcode',
      startTime: new Date(contest.startTime * 1000).toISOString(),
      duration: contest.duration,
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
    }));
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
};



// CodeChef API
const fetchCodeChefContests = async (): Promise<Contest[]> => {
  try {
    const response = await axios.get('https://www.codechef.com/api/list/contests/all');
    
    console.log('CodeChef Response:', response.data);

    if (!response.data.future_contests) {
      throw new Error('Invalid response format from CodeChef');
    }

    const contests = [
      ...response.data.future_contests,
      ...response.data.present_contests,
      ...response.data.past_contests,
    ].filter(Boolean); // Remove null values

    return contests.map((contest: any) => ({
      id: `cc_${contest.contest_code}`,
      name: contest.contest_name,
      platform: 'codechef',
      startTime: new Date(contest.contest_start_date).toISOString(),
      duration: contest.contest_duration * 60, // Convert hours to minutes
      url: `https://www.codechef.com/${contest.contest_code}`,
      status: contest.status,
    }));
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error);
    return [];
  }
};

// Fetch all contests
export const fetchAllContests = async (): Promise<Contest[]> => {
  try {
    const [codeforcesContests, leetcodeContests, codechefContests] = await Promise.all([
      fetchCodeforcesContests(),
      fetchLeetCodeContests(),
      fetchCodeChefContests(),
    ]);

    return [...codeforcesContests, ...leetcodeContests, ...codechefContests];
  } catch (error) {
    console.error('Error fetching all contests:', error);
    return [];
  }
};