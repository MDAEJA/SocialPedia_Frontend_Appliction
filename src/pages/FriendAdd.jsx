import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addFriend } from '../redux/friend';

function FriendAdd() {
  const userFriends = useSelector((state) => state.friend.allFriends || []);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();

  // Fetch all users from the server
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8090/user/details');
      setUserList(response.data.allUser);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [userFriends]);

  // Handle adding a friend
  const handleAddFriend = async (friendId) => {
    try {
      await axios.put(`http://localhost:8090/user/addFriend`, {
        userId: friendId,
      });
      dispatch(addFriend([friendId]));
      toast.success("Friend added successfully.");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to add friend.");
    }
  };

  return (
    <div className="min-h-fit w-fit  p-10 m-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Friend</h1>
      <div className="flex flex-col items-center gap-6 h-[70vh] overflow-y-auto p-10 mx-10 bg-white shadow-lg  rounded-lg">
        {userList.map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg p-4 w-full max-w-sm hover:shadow-lg transition-shadow"
          >
            <img
              src={'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'}
              alt={user.firstName}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-medium">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4">
              {userFriends.includes(user._id) ? (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                >
                  Already Added
                </button>
              ) : (
                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Friend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendAdd;
