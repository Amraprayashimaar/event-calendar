import React, { useState, useEffect } from 'react';

const EventModal = ({ date, event, onClose, onSave }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description);
      setCategory(event.category);
    }
  }, [event]);

  const handleSave = () => {
    const newEvent = {
      name: eventName,
      startTime,
      endTime,
      description,
      category,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="modal">
      <h3>{event ? 'Edit Event' : 'Add Event'} for {date.toDateString()}</h3>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="time"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={handleSave}>Save Event</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EventModal;
