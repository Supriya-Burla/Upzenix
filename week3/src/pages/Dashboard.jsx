import React from 'react';
import { Users, Ticket, DollarSign, TrendingUp, Activity, Film } from 'lucide-react';

const Dashboard = () => {
  const cards = [
    { 
      title: 'Total Users', 
      value: '12,345', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12.5%',
      changeType: 'positive'
    },
    { 
      title: 'Total Tickets', 
      value: '8,765', 
      icon: Ticket, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+8.2%',
      changeType: 'positive'
    },
    { 
      title: 'Revenue', 
      value: '$123,456', 
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+15.3%',
      changeType: 'positive'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-gray-400">Here's what's happening with your movie database today.</p>
      </div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} shadow-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                card.changeType === 'positive' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                <TrendingUp className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
        </div>
        <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700 transition-colors">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-blue-500" />
                <p className="text-white font-medium">New movie "Avengers: Endgame" added to catalog</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-white font-medium">Ticket sales increased by 15%</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-yellow-500" />
                <p className="text-white font-medium">System maintenance scheduled for tonight</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;