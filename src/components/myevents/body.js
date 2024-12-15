import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localhost } from '../../url';

const MyEventsBody = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendeeDetails, setAttendeeDetails] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    limit: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Assuming token is stored in localStorage
        const response = await axios.get(localhost+'/api/events/my-events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Open the edit modal with the event details
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setAttendeeDetails({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      limit: event.limit,
    });
    setIsModalOpen(true);
  };

  // Handle the deletion of the event
  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  // Close the edit modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setAttendeeDetails({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      limit: '',
    });
  };

  // Close the delete confirmation modal
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // Submit the edited event details
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log('Updated Event Details:', attendeeDetails);
    alert('Event updated successfully!');
    setIsModalOpen(false);
  };

  // Confirm deletion of the event
  const handleConfirmDelete = () => {
    console.log('Event deleted:', selectedEvent);
    alert('Event deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {event.date}
              </span>
            </div>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Description:</span> {event.description}
              </p>
              <p>
                <span className="font-medium">⏰:</span> {event.time}
              </p>
              <p>
                <span className="font-medium">📍:</span> {event.location}
              </p>
              <p>
                <span className="font-medium">Attendee Limit:</span> {event.limit}
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="flex items-center justify-center bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition"
                onClick={() => handleEditEvent(event)}
              >
                Edit
              </button>
              <button
                className="flex items-center justify-center bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition"
                onClick={() => handleDeleteEvent(event)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEventsBody;
