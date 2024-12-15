import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localhost } from '../../url';
import {jwtDecode} from 'jwt-decode';


const Body = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendeeDetails, setAttendeeDetails] = useState({ name: '', email: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(localhost+'/api/events'); // Replace with your backend URL
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = (event) => {
    setSelectedEvent(event); // Store the selected event
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get the token from local storage
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('User is not logged in');
        return;
      }
  
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Assuming the decoded token has a userId field
      console.log(userId+"userid");
      
      // Send booking data to the backend with the token in the headers
      const response = await axios.post(
        localhost+'/api/events/book',
        { eventId: selectedEvent._id, userId: userId }, // Payload includes userId
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );
  
      alert(response.data.message);
      setAttendeeDetails({ name: '', email: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error booking event:', error.response?.data?.message || error.message);
      alert('Error booking event: ' + (error.response?.data?.message || 'Server error'));
    }
  };


  return (
    <div className="container mx-auto px-3 py-8">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for events..."
          className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="border rounded-lg shadow-md p-4 flex flex-col justify-between relative bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">📍:</span> {event.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">📅:</span> {event.date}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">⏰:</span> {event.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium"></span> {event.description}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-gray-700 text-gray-700 text-2xl font-extrabold flex items-center justify-center">
                  {event.remainingSeats}
                </div>
                <p className="text-xs text-blue-500 mt-1"> Remaining</p>
              </div>
            </div>
            {event.remainingSeats === 0 ? (
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-50"
                disabled
              >
                Sold Out
              </button>
            ) : (
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleBookNow(event)}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Attendee Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={attendeeDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={attendeeDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
