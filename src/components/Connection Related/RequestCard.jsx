import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../../utils/requestSlice";

const RequestCard = ({ user }) => {
    const dispatch=useDispatch();
    if (!user) return <h1 className="text-white text-xl">Loading...</h1>;
    const reviewRequest=async(status,email)=>{
        try{
            console.log(status,email)
            const res=await axios.post(`${BASE_URL}/connection/request/review/${status}/${email }`,{},{
                withCredentials:true,
            })
            console.log(user._id)
            dispatch(removeRequest(user._id))
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const {
        firstName = "",
        lastName = "",
        skills = [],
        about = "",
        photoURL = "",
    } = user;

    return (
        <div className="m-10 relative z-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-80 h-[480px] p-4 flex flex-col justify-between text-white transition-transform hover:scale-105 duration-300">
            <figure className="mb-4 relative z-0">
                <img
                    className="rounded-full w-24 h-24 object-cover mx-auto border border-white/30 shadow-sm z-[-10]"
                    src={photoURL || "https://via.placeholder.com/150"}
                    alt={`${firstName} ${lastName}`}
                />
            </figure>

            <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold tracking-wide">
                    {firstName} {lastName}
                </h2>
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

            {/* Button group: Add, Accept, Reject */}
            <div className="flex justify-center gap-3 mt-4">

                <button 
                onClick={()=>reviewRequest("accepted",user.email)}
                className="px-4 py-2 text-sm text-white bg-[#4AE896] rounded-full hover:bg-[#3cd68b] transition-colors duration-200">
                    Accept
                </button>
                <button 
                onClick={()=>reviewRequest("rejected",user.email)}
                className="px-4 py-2 text-sm text-white bg-[#F07171] rounded-full hover:bg-[#e65c5c] transition-colors duration-200">
                    Reject
                </button>
            </div>
        </div>
    );
};

export default RequestCard;