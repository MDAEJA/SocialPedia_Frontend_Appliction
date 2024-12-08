import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SetUserProfileFalse } from "../redux/createPost";
import { setLogin } from "../redux/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.user.token);
  const userPicture = useSelector((state) => state.user.picturePath);
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.user._id); // Get user ID from Redux store
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null); // File input state
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  

  // Fetch user details
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://socialpedia-backend-application.onrender.com/user/${userId}/getuser`);
      const userData = response.data.userInfo; // Adjust as per API response
      setUser(userData);
      setEditUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      // toast.error("Error fetching user details.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  // Handle save operation
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", editUser.firstName);
      formData.append("lastName", editUser.lastName);
      formData.append("email", editUser.email);
      if (file) {
        formData.append("file", file); // Append file only if selected
      }

      const response = await axios.put(
        `https://socialpedia-backend-application.onrender.com/user/${userId}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User updated successfully:", response.data);
      const responseUser = await axios.get(`https://socialpedia-backend-application.onrender.com/user/${userId}/getuser`);
      const userData = responseUser.data.userInfo;
      setUser(userData);
      setEditUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      // fetchUser(); // Refresh user details after update
      const payload = {
        name : userData.firstName,
        token : token,
        id : userId,
        picture : userData.picturePath
      }
      dispatch(setLogin(payload));
      setIsEditing(false); // Exit edit mode
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen w-screen m-4 p-4">
      <div className="w-fit rounded-lg mx-auto my-4 shadow-lg p-6 bg-rose-400 text-white font-serif">
        <div className="flex items-center gap-6">
          <img
            src={userPicture || `https://cdn-icons-png.flaticon.com/128/3177/3177440.png`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-white p-1"
          />
          {!isEditing ? (
            <div>
              <h2 className="text-2xl font-semibold capitalize ">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-white text-center mt-1 hover:underline">{user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="firstName"
                value={editUser.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-2"
                placeholder="First Name"
              />  
              <input
                type="text"
                name="lastName"
                value={editUser.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded text-black px-3 py-2 mb-2"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded text-black px-3 py-2 mb-2"
                placeholder="Email"
              />
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded  px-3 py-2 mb-2"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800">Friends</h3>
          {user.friends?.length === 0 ? (
            <p className="mt-2 text-gray-600">No friends yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 flex gap-2 flex-wrap">
              {user.friends?.map((friend, index) => (
                <li key={index} className="text-gray-800 capitalize font-serif italic bg-gray-100 p-2 rounded">
                  {friend.userName} 
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
          <button
            className="mt-3 w-fit mx-auto px-5 py-3 capitalize font-serif font-bold bg-red-700 text-white rounded-lg hover:bg-green-600 cursor-pointer"
            onClick={()=> {dispatch(SetUserProfileFalse())}}
          >
            Close
          </button>
        </div>
    </div>
  );
};

export default UserProfile;
