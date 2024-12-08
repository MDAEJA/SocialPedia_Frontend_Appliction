import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addFriend, setFriends } from "../redux/friend";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const userFriends = useSelector((state) => state.friend.allFriends || []);
  const [userList, setUserList] = useState([]);
  const id = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://socialpedia-backend-application.onrender.com/user/details");
      if (!id) {
        console.log("Login first");
        return;
      }

      const userAll = response.data.allUser.filter((user) => user._id !== id);
      const userPresent = response.data.allUser.find((user) => user._id === id);

      if (userPresent) {
        const payload = { friends: userPresent.friends };
        dispatch(setFriends(payload));
      }

      setUserList(userAll);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isFriend = (friendId) => {
    return userFriends.some((friend) => friend.userId === friendId);
  };

  const addingFriend = async (userId, friendId) => {
    try {
      await axios.put(`https://socialpedia-backend-application.onrender.com/user/${userId}/${friendId}/addFriend`);
      fetchUsers();
      toast.success("Friend added successfully.");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to add friend.");
    }
  };

  const removeFriend = async (userId, friendId) => {
    try {
      // Send DELETE request to the backend to remove the friend
      const response = await axios.delete(`https://socialpedia-backend-application.onrender.com/user/${userId}/${friendId}/deleteFriend`);
  
      // Check if the response was successful
      if (response.status === 200) {
        // Refetch the list of users after friend is removed
        fetchUsers();
        toast.success("Friend removed successfully.");
      } else {
        toast.error("Failed to remove friend.");
      }
    } catch (err) {
      // Log and display the error
      console.error("Error while removing friend:", err);
      toast.error("An error occurred while removing friend.");
    }
  };
  

  const filteredUsers = userList.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-6 bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-black font-semibold bg-white  border-rose-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="absolute inset-y-0 right-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 5a7 7 0 107 7m0 0a7 7 0 00-7-7"
              />
            </svg>
          </span>
        </div>

        {/* Search Results */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5 border-white border-solid border-2 bg-rose-400 rounded-lg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506654013677-20cac9a8a9e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw4ODA5MjUzM3x8ZW58MHx8fHx8')`, // Replace with your image URL
          backgroundSize: "cover", // Ensures the image covers the div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents image repetition
        }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center justify-center bg-rose-300 font-serif px-5 p-1 border-white border-solid border-2  mx-auto shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={user.picturePath || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                  alt="userpicture"
                  className="object-cover text-black w-32 h-32 rounded-full border-4 border-white mb-4"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold capitalize">{`${user.firstName} ${user.lastName}`}</h3>
                  <p className="text-amber-900 font-semibold text-sm hover:text-white underline">{user.email}</p>

                  {isFriend(user._id) ? (
                    <button
                      className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => removeFriend(id, user._id)}
                    >
                      Remove Friend
                    </button>
                  ) : (
                    <button
                      className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => addingFriend(id, user._id)}
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white font-extrabold col-span-full">No users found.</p>
          )}
        </div>

        <div className="flex items-center">
          <button
            className="mt-3 w-fit mx-auto border-white border-solid border-2 font-mono px-5 py-1 capitalize font-semibold bg-red-700 text-white rounded-lg hover:bg-green-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
