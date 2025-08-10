import React from 'react'

const ConnectionCard = (props) => {
  const { firstName, lastName, skills, about, photoURL } = props;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 m-4 w-80 text-white hover:scale-105 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={photoURL?.photoURL || 'https://via.placeholder.com/80'} // fallback image
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 rounded-full object-cover border border-white/30"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-white/70">{about}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ConnectionCard;