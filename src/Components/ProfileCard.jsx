import React from "react";
import { useSelector } from "react-redux";


const ProfileCard = () => {
    const userPicture = useSelector((state) => state.user.picturePath);
const userName = useSelector((state) => state.user.userName);
const darkMode = useSelector((state)=> state.theme.darkMode);
  return (
    <div className={`hidden md:block max-w-[200px] my-4 mx-auto ${darkMode ? 'bg-black' : 'bg-rose-400'}  border-white border-solid  shadow-lg rounded-lg overflow-hidden`}>
      <div className="flex flex-col items-center p-4">
        {/* Profile Image */}
        <img
          src={ userPicture || 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-white mb-4"
        />
        {/* Profile Name */}
        <h2 className="text-xl font-semibold text-white capitalize cursor-pointer hover:underline">{userName}</h2>
        <p className="text-white capitalize mt-2 underline">Software Developer</p>
      </div>
    </div>
  );
};

export default ProfileCard;
