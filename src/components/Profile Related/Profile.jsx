import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { setUser } from '../../utils/userSlice';
import FeedCard from '../feedCard';

const Profile = () => {
  const userInfo = useSelector(state => state.user);
  const { firstName, lastName, skills, about, photoURL, email } = userInfo;
  const loading = !userInfo;
  
  //  editable fields
  const [emailState, setEmailState] = useState(email);
  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [skillsState, setSkillsState] = useState(skills);
  const [aboutState, setAboutState] = useState(about);
  const [photoURLState, setPhotoURLState] = useState(photoURL);
  
  // Password state 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

  const updateData = async () => {
    try {
      const updatedUserInfoPayload = {
        firstName: firstNameState,
        lastName: lastNameState,
        skills: skillsState,
        about: aboutState,
        photoURL: photoURLState,
        email: emailState,
      };

      // Only include password if it's being changed
      if (isChangingPassword && newPassword) {
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        updatedUserInfoPayload.password = newPassword;
      }

      const res = await axios.patch(`${BASE_URL}/profile/edit`, updatedUserInfoPayload, {
        withCredentials: true,
      });
      
      dispatch(setUser(res.data.data));
      setError(null);
      setIsChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      console.error("Error in Updating User", err);
    }
  };


  useEffect(()=>{
    if(!userInfo){
      return <h1>Loading</h1>
    }

  },[userInfo])
  return (
    <div className="flex gap-10 justify-center">
      <div className="flex flex-row gap-10 justify-center mt-10">
        <fieldset className="flex flex-col fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {error && <p className="justify-center font-bold text-2xl text-red-500 fieldset-legend">{error}</p>}
          <p className="justify-center font-bold text-2xl fieldset-legend">Edit Profile</p>

          <label className="label">Email</label>
          <input type="email" value={emailState} onChange={(e) => setEmailState(e.target.value)} className="input input-bordered" />

          <div className="mt-4">
            <button 
              className="btn btn-sm btn-outline" 
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
            </button>

            {isChangingPassword && (
              <div className="mt-2 space-y-2">
                <label className="label">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="input input-bordered" 
                  placeholder="Enter new password"
                />

                <label className="label">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="input input-bordered" 
                  placeholder="Confirm new password"
                />
              </div>
            )}
          </div>

          <label className="label">First Name</label>
          <input type="text" value={firstNameState} onChange={(e) => setFirstNameState(e.target.value)} className="input input-bordered" />

          <label className="label">Last Name</label>
          <input type="text" value={lastNameState} onChange={(e) => setLastNameState(e.target.value)} className="input input-bordered" />

          <label className="label">Skills</label>
          <input type="text" value={skillsState?.join(', ')} onChange={(e) => setSkillsState(e.target.value.split(',').map(skill => skill.trim()))} className="input input-bordered" placeholder="e.g., React, Node.js, MongoDB" />

          <label className="label">Photo URL</label>
          <input type="text" value={photoURLState} onChange={(e) => setPhotoURLState(e.target.value)} className="input input-bordered" />

          <label className="label">About</label>
          <textarea value={aboutState} onChange={(e) => setAboutState(e.target.value)} className="textarea textarea-bordered" rows="3"></textarea>

          <button className="btn btn-neutral mt-4" onClick={updateData}>Update Profile</button>
        </fieldset>

        <div>
          <p className="justify-center font-bold text-2xl fieldset-legend">Profile Preview</p>
          <FeedCard userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;