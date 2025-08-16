import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { useEffect, useState } from "react";
import { removeConnections } from "../../utils/connectionSlice";
import { removeFeed } from "../../utils/feedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.log("Error in Logging Out:", err);
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <nav className="relative z-[300] bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-white/80 transition"
      >
        Code Mate
      </Link>

      {/* User Section */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 rounded-full overflow-hidden border border-white/30 shadow-md hover:ring-2 hover:ring-white/30 transition"
          >
            <img
              src={user.photoURL || "https://via.placeholder.com/80"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <ul className="absolute right-0 mt-3 w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-3 text-sm text-white animate-fadeIn">
              <li className="mb-2">
                <Link
                  to="/profile"
                  className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  Profile{" "}
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    New
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/connections"
                  className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  Connections
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/requests"
                  className="block px-3 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/30 text-red-300 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
