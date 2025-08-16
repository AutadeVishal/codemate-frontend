import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { useEffect } from "react";
import { removeConnections } from "../../utils/connectionSlice";
import { removeFeed } from "../../utils/feedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Error in Logging Out:", err);
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  return (
    <div className="relative z-[300] navbar bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md text-white px-6 py-2">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-semibold tracking-wide hover:text-white/80 transition">
          Code Mate
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button
              className="w-10 h-10 rounded-full overflow-hidden border border-white/30 shadow-sm hover:scale-105 transition"
            >
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
             {/* below for <ul> we did group-focus-within:block means anyone of this elemnt's sibling got clicked or focused show block of hidden drop down menu */ }
            <ul
              className="absolute right-0 mt-2 w-52 bg-black/60 backdrop-blur-lg border border-white/30 rounded-xl p-3 text-sm text-white shadow-xl hidden group-hover:block group-focus-within:block z-[350]"
             
            >

              <li className="mb-2">
                <Link to="/profile" className="flex justify-between hover:text-white/80 transition">
                  Profile <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">New</span>
                </Link>
              </li>
              <li className="mb-2"><Link to="/connections" className="hover:text-white/80 transition">Connections</Link></li>
              <li className="mb-2"><Link to="/requests" className="hover:text-white/80 transition">Requests</Link></li>
              <li><button onClick={handleLogout} className="w-full text-left hover:text-red-400 transition">Logout</button></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;