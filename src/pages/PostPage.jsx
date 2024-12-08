import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPost } from "../redux/post"; // Correct import
// import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

import PostCard from "../Components/PostCard";
import SideBar from "../Components/SideBar";
import Carousel from "./Carousel";
import ProfileCard from "../Components/ProfileCard";

function PostPage() {
  const userPosts = useSelector((state) => state.postInfo.postAll); // Access posts from Redux
  const postShow = useSelector((state) => state.post.postShow);
  const darkMode = useSelector((state) => state.theme.darkMode)
  
  const dispatch = useDispatch();

  useEffect(() => {
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
    fetchPost();
  }, [dispatch,userPosts]);

  return (
    <>
    
      
    <div
      className={`container mx-auto my-4 p-4 rounded-xl  bg-rose-400 ${
        postShow ? "pointer-events-none opacity-50" : "enabled"
      }`}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNvY2FpbCUyMG1lZGlhfGVufDB8fDB8fHww')`, // Replace with your image URL
        backgroundSize: "cover", // Ensures the image covers the div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}
    >
      
      {/* Page Header */}
      
      <div
  className={`hidden md:block lg:font-sans lg:text-2xl font-extrabold text-center text-white py-4 px-6 rounded-lg shadow-md border ${
    darkMode ? "bg-black" : "bg-rose-400"
  } w-full mb-4 overflow-hidden`}
>
  <motion.h1
    className="whitespace-nowrap capitalize font-serif"
    animate={{ x: ["100%", "-100%"] }}
    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
  >
    Welcome back! We’re glad to see you. Let us know. what you think about this feature!
  </motion.h1>
</div>
      
      {/* Post Cards Container */}
      <div className="flex items-center justify-between gap-5 p-4 rounded-md"
       style={{
        backgroundImage: `url('')`, // Replace with your image URL
        backgroundSize: "cover", // Ensures the image covers the div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}>
        <SideBar/>
        
      <div className="rounded-lg shadow-md p-4 max-h-[70vh] w-fit overflow-scroll"
      style={{
        backgroundImage: `url('')`, // Replace with your image URL
        backgroundSize: "cover", // Ensures the image covers the div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}
      >
        {userPosts && userPosts.length > 0 ? (
          <div className="flex-col p-4 ">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex-col">
            <motion.h1
              className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
              animate={{ x: [100, -1000] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              Loading Posts...
            </motion.h1>
          </div>
        )}
      </div>
      <div className="">
     
      <ProfileCard/>
      <Carousel/>
      
      </div>
       
      </div>
  
    </div>
    </>
  );
}

export default PostPage;
