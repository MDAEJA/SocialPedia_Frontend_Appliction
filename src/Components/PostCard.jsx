import { ChatBubbleOutline, Share, ThumbUp } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../redux/post";
import { toast } from "react-toastify";

function PostCard({ post }) {
  const [commentShow, setCommentShow] = useState(false);
  const userName = useSelector((state)=>state.user.userName);
  const userId = useSelector((state) => state.user._id); // Get user ID from Redux store
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [userImage,setUserImage] = useState("");
  // const userId = useSelector((state) => state.user._id); // Get user ID from Redux store
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  // const pictureUser = useSelector((state) => state.user.picturePath)


  const userLogo = async ()=>{
    const userId = post.userId
    try{
      const response = await axios.get(`https://socialpedia-backend-application.onrender.com/user/${userId}/getuser`);
    const userData = response.data.userInfo; // Adjust as per API response
     setUserImage(userData.picturePath);
    }
    catch (err) {
      console.error("Error userLogo :", err);
    }
   
  }

  useEffect(()=>{
    userLogo();
  },[])

  useEffect(() => {
    const isLikedByUser = post.likes[userId];
    setLiked(isLikedByUser);
  }, [post.likes,userId]);
  

  if (!post) {
    return <div>Loading...</div>;
  }
  // Fetch Posts from the backend and update Redux store
  const fetchPost = async () => {
    try {
      const response = await axios.get("https://socialpedia-backend-application.onrender.com/user/post");
      const payload = {
        postData: response.data.post.reverse(), // Reverse for latest posts first
      };
      dispatch(setPost(payload));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Construct the full URL for user and post images
  const userImageUrl = post.userPicturePath
    ? `${post.userPicturePath}`
    : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"; // Placeholder image if not available

  const postImageUrl = post.picturePath ? `${post.picturePath}` : "";

  const commentHandler = async (postId, comment) => {
    try {
      if(userName === 'user'){
        toast.error("Please login to comments !");
        return
      }
      if (!postId || !userId || !comment) {
        toast.error("All fields are required");
        return;
      }

      const response = await axios.post(
        `https://socialpedia-backend-application.onrender.com/post/${postId}/comment`,
        {
          userId,
          comment,
        }
      );

      if (response.data) {
        toast.success("Comment added successfully!");
        fetchPost();
        setComment("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const likeHandler = async (postId) => {
    try {
      if (userName === "user") {
        toast.error("Please login to like posts!");
        return;
      }
  
      if (!postId) {
        toast.error("All fields are required");
        return;
      }
  
      const response = await axios.post(
        `https://socialpedia-backend-application.onrender.com/post/${postId}/like`,
        { userId }
      );
  
      if (response.data) {
        toast.success(response.data.message);
  
        // Update the liked state dynamically based on the backend response
        setLiked(response.data.isLiked);
  
        // Optionally update the post data or fetch again
        fetchPost();
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      toast.error(err.response?.data?.message || "Failed to update like");
    }
  };
  
  return (
    <div
      className={`${
        darkMode
          ? "bg-black"
          : "bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200"
      } w-fit max-w-lg mx-auto rounded-xl border-white border-solid border-2 shadow-2xl overflow-hidden mb-6 transition transform hover:scale-105 duration-300 `}
      style={{
        backgroundImage: `url('')`, // Replace with your image URL
        backgroundSize: "cover", // Ensures the image covers the div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}
    >
      {/* User Info */}
      <div className="flex items-center p-4 ">
        <img
          src={userImage || userImageUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div
          className={`ml-4 capitalize font-serif p-2 ${
            darkMode ? "bg-black" : "bg-cyan-700"
          } rounded-md`}
        >
          <h3 className="font-bold text-white text-center text-lg">
            {post.firstName} {post.lastName}
          </h3>
          <p className="text-sm text-white text-center">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Description */}
      <div className="bg-rose-400 capitalize text-center mx-auto w-fit p-2 rounded-md">
        <p className="text-white font-serif ">*** {post.description} ***</p>
      </div>

      {/* Post Image */}
      {post.picturePath && (
        <div className="px-6 py-4">
          <a href={postImageUrl}>
          <img
            src={postImageUrl}
            alt="Post"
            className="w-full rounded-lg object-cover max-h-96"
          />
          </a>
          
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-around items-center">
      <button
  className={`flex items-center px-4 py-2 rounded-md transition ${
    liked ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
  } ${userName === "user" ? "opacity-50 cursor-not-allowed" : ""}`}
  onClick={() => userName !== "user" && likeHandler(post._id)}
  disabled={userName === "user"} // Disable button for non-logged-in users
>
  <ThumbUp className={`mr-2 ${liked ? "text-white" : "text-red-500"}`} />
  {liked ? "Liked" : "Like"}
</button>


        {/* <button
          className={`flex items-center px-4 py-2 rounded-md transition ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => likeHandler(post._id, post.userId)}
        >
          <ThumbUp className={`mr-2 ${liked ? "text-white" : "text-red-500"}`} />
          {liked ? "Liked" : "Like"}
        </button> */}
        <button
          className={`flex items-center font-serif bg-white p-2 rounded-lg font-extrabold ${
            darkMode ? "text-gray-800" : "text-gray-950"
          }`}
          onClick={() => setCommentShow(!commentShow)}
        >
          <ChatBubbleOutline className="mr-1" />
          Comment
        </button>
        <button
          className={`flex items-center bg-white p-2 rounded-lg font-serif font-extrabold ${
            darkMode ? "text-gray-800" : "text-gray-950"
          }`}
        >
          <Share className="mr-1" />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {commentShow && (
        <div className="border-t border-gray-600 bg-white p-4">
          {post.comments?.length > 0 ? (
            post.comments.map((comment, index) => (
              <div
                key={index}
                className={`p-2 mb-4 capitalize rounded-md ${
                  darkMode ? "bg-black" : "bg-rose-400"
                }`}
              > 
              
                <h2 className="font-serif font-extrabold text-white">{comment.userName}</h2>
                <p className="text-white font-serif ">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="font-serif font-extrabold text-gray-950">No comments yet.</p>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 rounded-lg border"
            />
            <button
              className="bg-blue-500 text-gray-950 font-serif font-extrabold px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => commentHandler(post._id, comment)}
            >
              Send
            </button>
          </div>
        </div>
      )}

<div
  className={`px-6 py-4 flex justify-between text-sm border-t border-gray-200 ${
    darkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-gray-600'
  }`}
>
  <span>{Object.keys(post.likes).length} Likes</span>
  <span>{post.comments.length} Comments</span>
</div>
    </div>
  );
}

export default PostCard;
