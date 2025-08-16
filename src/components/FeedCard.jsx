import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/feedSlice";

const FeedCard = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, skills, about, photoURL, age, gender } = userInfo;

  const handleConnection = async (status, email) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connection/request/send/${status}/${email}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser(userInfo._id));
      console.log("User Sent Request", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!userInfo) return <h1 className="text-white text-xl">Loading...</h1>;

  return (
    <div className="relative z-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-80 h-[500px] p-6 flex flex-col justify-between text-white transition-transform hover:scale-105 duration-300">
      {/* Profile Image */}
      <figure className="mb-4 relative z-0">
        <img
          className="rounded-full w-28 h-28 object-cover mx-auto border-2 border-white/40 shadow-md ring-2 ring-white/20"
          src={photoURL || "https://via.placeholder.com/150"}
          alt="User Profile"
        />
      </figure>

      {/* Info Section */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold tracking-wide">
          {firstName} {lastName}
        </h2>

        {/* Age + Gender as badges */}
        <div className="flex justify-center gap-2 flex-wrap">
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

        {/* About */}
        {about && <p className="text-sm opacity-80 italic px-2">{about}</p>}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-5 mt-6">
        <button
          className="px-5 py-2 text-sm text-white border border-white/30 rounded-full hover:bg-white/20 transition"
          onClick={() => handleConnection("ignored", userInfo.email)}
        >
          Ignore
        </button>
        <button
          className="px-5 py-2 text-sm text-white bg-[#F07171] rounded-full hover:bg-[#e65c5c] shadow-md transition"
          onClick={() => handleConnection("interested", userInfo.email)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
