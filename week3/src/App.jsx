import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import KanbanPage from './pages/KanbanPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TablesPage from './pages/TablesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/kanban" element={<KanbanPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/tables" element={<TablesPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
