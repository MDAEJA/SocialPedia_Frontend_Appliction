import React from "react";
import { useSelector } from "react-redux";

const FriendPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium text-gray-800">Friends List</h3>
      {user.friends && user.friends.length === 0 ? (
        <p className="mt-2 text-gray-600">You don't have any friends yet.</p>
      ) : (
        <ul className="mt-2 space-y-1">
          {user.friends?.map((friend, index) => (
            <li key={index} className="text-gray-800 bg-gray-100 p-2 rounded">
              {friend}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendPage;
