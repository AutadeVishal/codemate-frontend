import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { setUser } from '../../utils/userSlice';
import FeedCard from '../FeedCard';

const Profile = () => {
  const userInfo = useSelector(state => state.user);
  const { firstName, lastName, skills, about, photoURL, email } = userInfo || {};
  const dispatch = useDispatch();

  // editable fields
  const [emailState, setEmailState] = useState(email || '');
  const [firstNameState, setFirstNameState] = useState(firstName || '');
  const [lastNameState, setLastNameState] = useState(lastName || '');
  const [skillsState, setSkillsState] = useState(skills || []);
  const [aboutState, setAboutState] = useState(about || '');
  const [photoURLState, setPhotoURLState] = useState(photoURL || '');

  // keep a separate string just for the input to prevent caret jumps/backspace issues
  const [skillsInput, setSkillsInput] = useState((skills && skills.join(', ')) || '');

  // Password state 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async () => {
    try {
      const updatedUserInfoPayload = {
        firstName: firstNameState,
        lastName: lastNameState,
        skills: skillsInput
          ? skillsInput.split(',').map(s => s.trim()).filter(Boolean)
          : [],
        about: aboutState,
        photoURL: photoURLState,
        email: emailState,
      };

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
      setSkillsState(res.data.data?.skills || []);
      setSkillsInput((res.data.data?.skills || []).join(', '));
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      console.error("Error in Updating User", err);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-white">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-10 justify-center text-white px-4">
      <div className="flex flex-row gap-10 justify-center mt-10">
        <fieldset className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-xs p-5 shadow-xl">
          {error && <p className="text-center font-bold text-red-400 mb-2">{error}</p>}
          <p className="text-center font-bold text-2xl mb-4">Edit Profile</p>

          <label className="text-sm text-white/80">Email</label>
          <input
            type="email"
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
            className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="you@example.com"
          />

          <div className="mt-4">
            <button 
              className="px-3 py-1.5 text-sm rounded-full border border-white/30 text-white hover:bg-white/15"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
            </button>

            {isChangingPassword && (
              <div className="mt-2 space-y-2">
                <label className="text-sm text-white/80">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" 
                  placeholder="Enter new password"
                />

                <label className="text-sm text-white/80">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" 
                  placeholder="Confirm new password"
                />
              </div>
            )}
          </div>

          <label className="mt-4 text-sm text-white/80">First Name</label>
          <input
            type="text"
            value={firstNameState}
            onChange={(e) => setFirstNameState(e.target.value)}
            className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="First name"
          />

          <label className="text-sm text-white/80">Last Name</label>
          <input
            type="text"
            value={lastNameState}
            onChange={(e) => setLastNameState(e.target.value)}
            className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="Last name"
          />

          <label className="text-sm text-white/80">Skills</label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => {
              const val = e.target.value;
              setSkillsInput(val);
              setSkillsState(val.split(',').map(s => s.trim()).filter(Boolean));
            }}
            className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="e.g., React, Node.js, MongoDB"
          />

          <label className="text-sm text-white/80">Photo URL</label>
          <input
            type="text"
            value={photoURLState}
            onChange={(e) => setPhotoURLState(e.target.value)}
            className="rounded-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            placeholder="https://..."
          />

          <label className="text-sm text-white/80">About</label>
          <textarea
            value={aboutState}
            onChange={(e) => setAboutState(e.target.value)}
            className="rounded-2xl px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
            rows="3"
            placeholder="A short bio..."
          ></textarea>

          <button 
            className="mt-4 px-4 py-2 rounded-full bg-white/15 text-white hover:bg-white/25 transition"
            onClick={updateData}
          >
            Update Profile
          </button>
        </fieldset>

        <div>
          <p className="text-center font-bold text-2xl mb-4">Profile Preview</p>
          <FeedCard userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
