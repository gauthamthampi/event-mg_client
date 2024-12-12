import React from 'react';

const MyEventsBanner = () => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <img
        src="https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg"
        alt="Event Banner"
        className="w-full h-96 object-cover"
      />
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-poppins opacity-75 px-4 py-2 rounded-lg">
          My Events
        </h1>
      </div>
    </div>
  );
};

export default MyEventsBanner;
