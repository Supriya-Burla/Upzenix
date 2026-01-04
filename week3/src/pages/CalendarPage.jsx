import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '../context/ThemeContext';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { isDark } = useTheme();

  const events = [
    {
      title: 'Movie Screening: Avengers',
      start: new Date(2026, 0, 5, 10, 0),
      end: new Date(2026, 0, 5, 12, 0),
    },
    {
      title: 'Booking Deadline',
      start: new Date(2026, 0, 10, 14, 0),
      end: new Date(2026, 0, 10, 15, 0),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Calendar</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className={isDark ? 'dark-calendar' : ''}
        />
      </div>
    </div>
  );
};

export default CalendarPage;