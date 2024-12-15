import React, { useState } from 'react';
import axios from 'axios';
import { localhost } from '../../url';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    description: '',
    organizer: '',
    maxAttendees: '',
  });
  const [errors, setErrors] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Event Title Validation
    if (!newEvent.title) newErrors.title = 'Title is required';
    
    // Description Validation
    if (!newEvent.description) newErrors.description = 'Description is required';
    
    // Date Validation
    if (!newEvent.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(newEvent.date);
      if (selectedDate <= today) {
        newErrors.date = 'Date must be a future date';
      }
    }
    
    // Time Validation
    if (!newEvent.time) newErrors.time = 'Time is required';
    
    // Location Validation
    if (!newEvent.location) newErrors.location = 'Location is required';
    
    // Organizer Validation
    if (!newEvent.organizer) newErrors.organizer = 'Organizer name is required';
    
    // Maximum Attendees Validation
    if (!newEvent.maxAttendees || newEvent.maxAttendees <= 0) newErrors.maxAttendees = 'Maximum attendees must be a positive number';
    
    return newErrors;
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const token = localStorage.getItem("userToken")
        const response = await axios.post(
          localhost+'/api/events/add',
          newEvent,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        console.log('New Event Added:', response.data);
        toggleModal(); // Close modal after adding event
        alert("New event added")
        window.location.reload()
      } catch (error) {
        console.error('Error adding event:', error);
        setErrors({ general: 'An error occurred while adding the event' });
      }
    } else {
      setErrors(formErrors); // Set validation errors
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      // Redirect to login or homepage after successful logout
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left Side - Image */}
        <div className="flex items-center">
          <a href="/">
            <img
              src="https://www.ueasu.org/pageassets/opportunities/committee-hub/events/WEB_HEADERS_opportunities_events.png"
              alt="Event Header"
              className="h-12 object-contain"
            />
          </a>
        </div>

        {/* Right Side - Add Event & Login Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-black transition"
            onClick={toggleModal}
          >
            + Add Event
          </button>
          <a href="/myevents">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-black transition">
              My events
            </button>
          </a>

          {/* Logout Image Link */}
          <a onClick={handleLogout} className="ml-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4421/4421772.png"
              alt="Logout"
              className="w-8 h-8 cursor-pointer"
            />
          </a>
        </div>
      </div>

      {/* Modal for Adding Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>

            {/* Scrollable content container */}
            <div className="max-h-80 overflow-y-auto mb-4">
              <form onSubmit={handleAddEvent}>
                {/* Event Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    rows="4"
                    required
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Date */}
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>

                {/* Time */}
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium">Time</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={newEvent.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                {/* Organizer Name */}
                <div className="mb-4">
                  <label htmlFor="organizer" className="block text-sm font-medium">Organizer Name</label>
                  <input
                    type="text"
                    name="organizer"
                    id="organizer"
                    value={newEvent.organizer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.organizer && <p className="text-red-500 text-sm">{errors.organizer}</p>}
                </div>

                {/* Maximum Attendee Limit */}
                <div className="mb-4">
                  <label htmlFor="maxAttendees" className="block text-sm font-medium">Maximum Attendee Limit</label>
                  <input
                    type="number"
                    name="maxAttendees"
                    id="maxAttendees"
                    value={newEvent.maxAttendees}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg"
                    required
                  />
                  {errors.maxAttendees && <p className="text-red-500 text-sm">{errors.maxAttendees}</p>}
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Event
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
