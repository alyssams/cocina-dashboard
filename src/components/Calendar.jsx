import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { gapi } from 'gapi-script';
import { initGoogleApi, checkScopes } from '../utils/googleApi';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyEvents, setDailyEvents] = useState([]);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      initGoogleApi()
        .then(() => {
          console.log('Google API initialized');
          listEvents();
          checkScopes();
        })
        .catch((error) => {
          console.error('Error initializing Google API:', error);
        });
    });
  }, []);

  const listEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 2500,
        singleEvents: true,
        orderBy: 'startTime',
      })
      .then((response) => {
        setEvents(response.result.items || []);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const onDateChange = (date) => {
    setSelectedDate(date);

    // Filter events for the selected date
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
    setDailyEvents(filteredEvents);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dayEvents = events.filter((event) => {
              const eventDate = new Date(event.start.dateTime || event.start.date);
              return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
              );
            });

            return dayEvents.length > 0 ? (
              <div className="event-indicator">{dayEvents.length} event(s)</div>
            ) : null;
          }
          return null;
        }}
      />

      {/* Events for Selected Date */}
      <div className="event-info-section">
        <h4>Events on {selectedDate.toDateString()}</h4>
        <ul className="event-list">
          {dailyEvents.length > 0 ? (
            dailyEvents.map((event) => (
              <li key={event.id} className="event-item">
                <strong>{event.summary}</strong>
                <p>{new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}</p>
              </li>
            ))
          ) : (
            <p className="no-events">No events for this day.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarComponent;
