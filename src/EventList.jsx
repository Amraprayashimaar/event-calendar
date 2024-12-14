
import React from 'react';

const EventList = ({ events, selectedDate, onDelete }) => {
  const dateKey = selectedDate.toISOString().split('T')[0];
  const dailyEvents = events[dateKey] || [];

  return (
    <div className="event-list">
      <h3>Events for {selectedDate.toDateString()}</h3>
      {dailyEvents.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul>
          {dailyEvents.map((event, index) => (
            <li key={index}>
              <span>{event.name}</span>
              <button onClick={() => onDelete(dateKey, index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
