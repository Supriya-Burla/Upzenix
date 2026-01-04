import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = () => {
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ];

  const bookingData = [
    { day: 'Mon', bookings: 20 },
    { day: 'Tue', bookings: 30 },
    { day: 'Wed', bookings: 25 },
    { day: 'Thu', bookings: 35 },
    { day: 'Fri', bookings: 40 },
    { day: 'Sat', bookings: 50 },
    { day: 'Sun', bookings: 45 },
  ];

  const genreData = [
    { name: 'Action', value: 30, color: '#8884d8' },
    { name: 'Comedy', value: 25, color: '#82ca9d' },
    { name: 'Drama', value: 20, color: '#ffc658' },
    { name: 'Horror', value: 15, color: '#ff7300' },
    { name: 'Romance', value: 10, color: '#00ff00' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Revenue Over Time</h2>
          <LineChart width={400} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Daily Bookings</h2>
          <BarChart width={400} height={300} data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Genre Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={genreData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {genreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;