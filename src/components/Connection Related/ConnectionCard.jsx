import React from "react";
import { Link } from "react-router-dom";

const ConnectionCard = (props) => {
  const { firstName, lastName, skills, about, photoURL, _id, age, gender } = props;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 m-4 w-80 text-white hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={photoURL || "https://via.placeholder.com/80"} // fallback image
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 rounded-full object-cover border border-white/30 shadow-sm"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {about && <p className="text-sm text-white/70 italic">{about}</p>}
        </div>
      </div>

      {/* Age + Gender */}
      <div className="flex gap-2 flex-wrap mb-3">
        {age && (
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
            {age} years
          </span>
        )}
        {gender && (
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 border border-white/30 backdrop-blur-sm capitalize">
            {gender}
          </span>
        )}
      </div>

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Chat Button */}
      <Link to={`/chat/${_id}`} className="mt-auto">
        <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#F07171] rounded-full hover:bg-[#e65c5c] shadow-md transition">
          Chat
        </button>
      </Link>
    </div>
  );
};

export default ConnectionCard;
