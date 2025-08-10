import React, { useState } from 'react';

const ProfileForm = ({ userInfo, updateData, error, setError, isChangingPassword, setIsChangingPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, emailState, setEmailState, firstNameState, setFirstNameState, lastNameState, setLastNameState, skillsState, setSkillsState, photoURLState, setPhotoURLState, aboutState, setAboutState }) => {
  return (
    <fieldset className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl text-white w-full max-w-md">
      {error && (
        <p className="text-center font-bold text-red-400 mb-2">{error}</p>
      )}
      <p className="text-center text-2xl font-semibold mb-4">Edit Profile</p>

      <label className="label text-white/90">Email</label>
      <input
        type="email"
        value={emailState || ''}
        onChange={(e) => setEmailState(e.target.value)}
        className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
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
          <div className="mt-3 space-y-2">
            <label className="label text-white/90">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
              placeholder="Enter new password"
            />
            <label className="label text-white/90">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
              placeholder="Confirm new password"
            />
          </div>
        )}
      </div>

      <label className="label mt-4 text-white/90">First Name</label>
      <input
        type="text"
        value={firstNameState || ''}
        onChange={(e) => setFirstNameState(e.target.value)}
        className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
      />

      <label className="label text-white/90">Last Name</label>
      <input
        type="text"
        value={lastNameState || ''}
        onChange={(e) => setLastNameState(e.target.value)}
        className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
      />

      <label className="label text-white/90">Skills</label>
      <input
        type="text"
        value={(skillsState && skillsState.join(', ')) || ''}
        onChange={(e) =>
          setSkillsState(e.target.value.split(',').map(s => s.trim()).filter(Boolean))
        }
        className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
        placeholder="e.g., React, Node.js, MongoDB"
      />

      <label className="label text-white/90">Photo URL</label>
      <input
        type="text"
        value={photoURLState || ''}
        onChange={(e) => setPhotoURLState(e.target.value)}
        className="input input-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
        placeholder="https://..."
      />

      <label className="label text-white/90">About</label>
      <textarea
        value={aboutState || ''}
        onChange={(e) => setAboutState(e.target.value)}
        className="textarea textarea-bordered bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40"
        rows="3"
        placeholder="A short bio..."
      ></textarea>

      <button
        className="mt-5 px-4 py-2 rounded-full bg-white/15 text-white hover:bg-white/25"
        onClick={updateData}
      >
        Update Profile
      </button>
    </fieldset>
  );
};

export default ProfileForm;