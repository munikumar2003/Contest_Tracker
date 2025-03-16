# 🖥️ Competitive Programming Contests Tracker

🚀 **Live Website:** [Competitive Programming Contests Tracker](https://neon-fenglisu-a578e6.netlify.app/)

This web application provides a **centralized platform** to track upcoming and ongoing programming contests from platforms like **Codeforces, LeetCode, and CodeChef**. It helps competitive programmers stay updated with live contests and schedules.

---

## 📌 Features

- ✅ Fetches contests from multiple platforms (**Codeforces, LeetCode, CodeChef**).
- ✅ Displays contest details (**name, start time, duration, status**).
- ✅ Clickable contest links for easy access.
- ✅ Real-time updates from different APIs.
- ✅ Simple and clean UI with a **responsive design**.

---

## 🔧 Tech Stack

- **Frontend:** React + TypeScript  
- **API Calls:** Axios  
- **Deployment:** Netlify  

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/munikumar2003/Contest_Tracker/
```

### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Start the Development Server
```sh
npm run dev
```
This will run the project at http://localhost:5173/.

# 🔗 API Integration
### 1️⃣ Codeforces API
Endpoint:
```sh
https://codeforces.com/api/contest.list?gym=false
```

### 2️⃣ LeetCode API (GraphQL)
Endpoint:
```sh
https://leetcode.com/graphql
```
Query:
```graphql
query getContestList {
  allContests {
    title
    titleSlug
    startTime
    duration
  }
}
```
### 3️⃣ CodeChef API
Endpoint:
```sh
https://www.codechef.com/api/list/contests/all
```
# 🚀 Deployment
The project is deployed on Netlify. To deploy:
```sh
npm run build
```
Then, upload the dist/ folder to Netlify or use the Netlify CLI.

# 👨‍💻 Contribution
Feel free to contribute! To contribute:

Fork the repository
Create a new branch
```sh
git checkout -b feature-branch
```
Make changes and commit
```sh
git commit -m "Added new feature"
```
Push to GitHub
```sh
git push origin feature-branch
```
Create a pull request

# 📧 Contact
For any queries, reach out at:
✉️ Email: munikumarchemuru2003@example.com
🔗 GitHub: munikumar2003


