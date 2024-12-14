
import React, { useState, useEffect } from 'react';
import './App.css';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import EventList from './EventList';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || {});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const handleSaveEvent = (newEvent) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const updatedEvents = { ...events, [dateKey]: [...(events[dateKey] || []), newEvent] };
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (dateKey, index) => {
    const updatedEvents = { ...events };
    updatedEvents[dateKey].splice(index, 1);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    if (sourceKey !== destinationKey) {
      const sourceEvents = [...events[sourceKey]];
      const destinationEvents = [...events[destinationKey]];

      const [removed] = sourceEvents.splice(source.index, 1);
      destinationEvents.splice(destination.index, 0, removed);

      const updatedEvents = {
        ...events,
        [sourceKey]: sourceEvents,
        [destinationKey]: destinationEvents,
      };

      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  return (
    <div className="app">
      <div className="header">
        <button className="mode-toggle" onClick={() => setDarkMode(!isDarkMode)}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <h1>Event Calendar</h1>
      </div>

      <div className="calendar-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <CalendarGrid
            events={events}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            openModal={() => setModalOpen(true)}
          />
        </DragDropContext>

        <div className="event-list-container">
          {isModalOpen && (
            <EventModal
              date={selectedDate}
              event={currentEvent}
              onClose={() => setModalOpen(false)}
              onSave={handleSaveEvent}
            />
          )}
          <EventList
            events={events}
            selectedDate={selectedDate}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
