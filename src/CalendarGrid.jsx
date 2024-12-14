
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const CalendarGrid = ({ events, selectedDate, setSelectedDate, openModal }) => {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const days = [...Array(daysInMonth)].map((_, index) => index + 1);

  const handleDayClick = (day) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
    openModal();
  };

  const getDayEvents = (day) => {
    const dateKey = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0];
    return events[dateKey] || [];
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>Prev</button>
        <br></br>
        <span>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <br></br>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>Next</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day header">{day}</div>
        ))}

        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            className={`calendar-day ${getDayEvents(day).length > 0 ? 'has-events' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <Droppable droppableId={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${day}`}>
              {(provided) => (
                <div
                  className="day-cell"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <span>{day}</span>
                  {getDayEvents(day).map((event, index) => (
                    <div className={`event ${event.category}`} key={index}>
                      {event.name}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
