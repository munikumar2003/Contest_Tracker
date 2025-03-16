const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Allow frontend to access this server
app.use(express.json());

app.get('/api/leetcode-contests', async (req, res) => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query getContestList {
          allContests {
            title
            titleSlug
            startTime
            duration
          }
        }
      `,
    });

    res.json(response.data.data.allContests);
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    res.status(500).json({ error: 'Failed to fetch LeetCode contests' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
