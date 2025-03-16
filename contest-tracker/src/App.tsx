import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import ContestList from './components/ContestList';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ContestList />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;