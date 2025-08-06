import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  console.log("User found in Navbar is below")
  console.log(user);
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      console.log("User Logged Out Successfully")
      navigate("/login");
    }
    catch (err) {
      console.log("Error in Logging Out : ")
      console.log(err);
      navigate("/error");
    }
  }
  useEffect(()=>{
    if(!user) navigate('/login')
  },[]);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Code Mate</Link>
      </div>
      {user && <div className="flex gap-2">

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>}
    </div>)
}

export default NavBar;