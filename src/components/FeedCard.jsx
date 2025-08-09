
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/feedSlice";

const FeedCard = ({ userInfo }) => {
  const dispatch=useDispatch();
  const { firstName, lastName, skills, about, photoURL } = userInfo;
  const handleConnection=async (status,email)=>{
    try{
      const res=await axios.post(`${BASE_URL}/connection/request/send/${status}/${email}`,{},{
        withCredentials:true,
      })
      dispatch(removeUser(userInfo._id))
      console.log("User Sent Request",res.data)

    }
    catch(err){
      console.log(err)
    }
  }
  if (!userInfo) return <h1 className="text-white text-xl">Loading...</h1>;

  return (
    <div className="relative z-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-80 h-[480px] p-4 flex flex-col justify-between text-white transition-transform hover:scale-105 duration-300">
      <figure className="mb-4 relative z-0">
        <img
          className="rounded-full w-24 h-24 object-cover mx-auto border border-white/30 shadow-sm z-[-10]"
          src={photoURL || 'https://via.placeholder.com/150'}
          alt="User Profile"
        />
      </figure>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold tracking-wide">{firstName} {lastName}</h2>
        <p className="text-sm opacity-80">{about}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button 
        className="px-4 py-2 text-sm text-white border border-white/30 rounded-full hover:bg-white/20"
        onClick={()=>handleConnection("ignored",userInfo.email)}
       >Ignore</button>
        <button 
        className="px-4 py-2 text-sm text-white bg-[#F07171] rounded-full hover:bg-[#e65c5c]"
        onClick={()=>handleConnection("interested",userInfo.email)}
        >Interested</button>
      </div>
    </div>
  );
};

export default FeedCard;