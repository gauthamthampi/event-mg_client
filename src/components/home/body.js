import React, { useState } from 'react';

const Body = () => {
  // Dummy event data with remaining seats
  const events = [
    {
      id: 1,
      title: "Music Concert",
      location: "New York",
      date: "2024-12-20",
      time: "7:00 PM",
      description: "Join us for an evening of live music featuring top artists and bands.",
      remainingSeats: 120,
    },
    {
      id: 2,
      title: "Tech Conference",
      location: "San Francisco",
      date: "2024-11-15",
      time: "9:00 AM",
      description: "Explore the latest innovations in technology with industry leaders.",
      remainingSeats: 0,
    },
    {
      id: 3,
      title: "Art Exhibition",
      location: "Paris",
      date: "2024-10-10",
      time: "11:00 AM",
      description: "Discover masterpieces and contemporary art from renowned artists.",
      remainingSeats: 200,
    },
    {
      id: 4,
      title: "Food Festival",
      location: "Tokyo",
      date: "2024-09-25",
      time: "1:00 PM",
      description: "Savor the best cuisines and street food from around the globe.",
      remainingSeats: 150,
    },
    {
      id: 5,
      title: "Film Festival",
      location: "Berlin",
      date: "2024-08-18",
      time: "6:00 PM",
      description: "Celebrate cinema with exclusive screenings and filmmaker Q&A sessions.",
      remainingSeats: 50,
    },
    {
      id: 6,
      title: "Marathon Run",
      location: "London",
      date: "2024-07-05",
      time: "8:00 AM",
      description: "Participate in a thrilling marathon through the streets of London.",
      remainingSeats: 300,
    },
  ];
  

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendeeDetails, setAttendeeDetails] = useState({
    name: '',
    email: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally save the details (e.g., send to the server)
    console.log('Attendee Details:', attendeeDetails);
    console.log('Event Details:', selectedEvent);
    alert('Booking confirmed!');

    // Reset the form and close the modal
    setAttendeeDetails({ name: '', email: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-3 py-8">
      {/* Search Bar - Centered and Shortened */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for events..."
          className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredEvents.map((event) => (
  <div
    key={event.id}
    className="border rounded-lg shadow-md p-4 flex flex-col justify-between relative bg-white hover:shadow-lg transition-shadow"
  >
    <div className="flex justify-between items-start">
      {/* Event Details */}
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

      {/* Remaining Seats */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full border-2 border-gray-700 text-gray-700 text-2xl font-extrabold flex items-center justify-center">
          {event.remainingSeats}
        </div>
        <p className="text-xs text-blue-500 mt-1"> Remaining</p>
      </div>
    </div>

    {/* Conditional Rendering for "Book Now" or "Sold Out" */}
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

      {/* Modal for Collecting Attendee Details */}
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
