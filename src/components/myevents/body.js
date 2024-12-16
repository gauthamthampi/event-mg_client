import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localhost } from '../../url';
import { format } from 'date-fns'; 
import {  useNavigate } from 'react-router-dom';

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
    maxAttendees: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate()

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(localhost + '/api/events/my-events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    const checkLogin = async() => {
      if(!localStorage.getItem("userToken")){
        navigate("/login")
      }
    }

    fetchEvents();
    checkLogin()
  }, []);

  // Open the edit modal with the event details
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setAttendeeDetails({
      title: event.title,
      description: event.description,
      date: event.date, // Ensure date is correctly set from event
      time: event.time,
      location: event.location,
      maxAttendees: event.maxAttendees,
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
      maxAttendees: '',
    });
  };

  // Close the delete confirmation modal
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // Submit the edited event details
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `${localhost}/api/events/${selectedEvent._id}`,
        attendeeDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Updated Event Details:', response.data);
      alert('Event updated successfully!');
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('An error occurred while updating the event.');
    }
  };

  // Confirm deletion of the event
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`${localhost}/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Event deleted:', selectedEvent);
      alert('Event deleted successfully!');
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Check if no events are available */}
      {events.length === 0 ? (
        <div className="text-center text-gray-500">No events available</div>
      ) : (
        // Events Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {format(new Date(event.date), 'MMMM dd, yyyy')}
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
                  <span className="font-medium">Attendee Limit:</span> {event.maxAttendees}
                </p>
                <p>
                  <span className="font-medium">Available seats:</span> {event.availability}
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
      )}

      {/* Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">Event Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={attendeeDetails.title}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, title: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={attendeeDetails.description}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, description: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  rows="4"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={attendeeDetails.date} // Ensure date is set properly here
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, date: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={attendeeDetails.time}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, time: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={attendeeDetails.location}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, location: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="limit" className="block text-sm font-medium">Attendee Limit</label>
                <input
                  type="number"
                  name="limit"
                  id="limit"
                  value={attendeeDetails.maxAttendees}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, maxAttendees: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-800 mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={handleDeleteModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsBody;
