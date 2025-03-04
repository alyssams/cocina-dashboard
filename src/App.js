import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import Tasks from './components/Tasks';
import Weather from './components/Weather';
import KitchenInventory from './components/KitchenInventory';
import Gardening from './components/Gardening';
import HabitTracker from './components/HabitTracker';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="dashboard">
      {/* Tab Navigation */}
      <nav className="dashboard-nav">
        {["calendar", "kitchen", "weather", "gardening", "habits"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'active' : ''}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Section */}
      <main className="dashboard-content">
        {activeTab === 'calendar' && <CalendarComponent />}
        {activeTab === 'kitchen' && <KitchenInventory />}
        {activeTab === 'weather' && <Weather />}
        {activeTab === 'gardening' && <Gardening />}
        {activeTab === 'habits' && <HabitTracker />}
      </main>
    </div>
  );
};

export default App;
