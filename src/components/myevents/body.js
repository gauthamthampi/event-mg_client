import React, { useState } from 'react';

const MyEventsBody = () => {
  // Dummy event data with remaining seats and other details
  const events = [
    {
      id: 1,
      title: "Music Concert",
      description: "An exciting music concert featuring top artists.",
      date: "2024-12-20",
      time: "7:00 PM",
      location: "New York",
      limit: 120,
    },
    {
      id: 2,
      title: "Tech Conference",
      description: "A conference to explore the latest tech trends.",
      date: "2024-11-15",
      time: "9:00 AM",
      location: "San Francisco",
      limit: 0,
    },
    // Add more events here...
  ];

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
    // Here you would normally save the updated event details (e.g., send to the server)
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event) => (
  <div
    key={event.id}
    className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300 relative"
  >
    {/* Event Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
        {event.date}
      </span>
    </div>

    {/* Event Details */}
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

    {/* Action Buttons */}
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

      {/* Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={attendeeDetails.title}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={attendeeDetails.description}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={attendeeDetails.date}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={attendeeDetails.time}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={attendeeDetails.location}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Limit</label>
                <input
                  type="number"
                  name="limit"
                  value={attendeeDetails.limit}
                  onChange={(e) => setAttendeeDetails({ ...attendeeDetails, limit: e.target.value })}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-4">Do you really want to delete this event?</p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsBody;
