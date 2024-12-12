import React from 'react';

const Banner = () => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <img
        src="https://img.freepik.com/premium-photo/person-with-headphones-crowd-people_81048-34870.jpg"
        alt="Event Banner"
        className="w-full h-96 object-cover"
      />
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-poppins opacity-75 px-4 py-2 rounded-lg">
          Discover More Events!!
        </h1>
      </div>
    </div>
  );
};

export default Banner;
