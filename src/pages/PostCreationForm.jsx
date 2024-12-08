import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostShowFalse } from "../redux/createPost";
import { setPost } from "../redux/post";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import axios from "axios";

function PostCreationForm() {
  const [file, setFile] = useState(null); // File object
  const [description, setDescription] = useState(""); // Description
  const [imageURL, setImageURL] = useState(""); // To store the image URL after uploading
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.user._id);
  const postShow = useSelector((state)=> state.post.postShow);

  
  const fetchPost = async () => {
    try {
      const response = await axios.get("https://socialpedia-backend-application.onrender.com/user/post");
      console.log(response.data.post);

      const payload = {
        postData: response.data.post.reverse(), // Reverse for latest posts first
      };
      dispatch(setPost(payload));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file object directly
      const fileURL = URL.createObjectURL(selectedFile); // Create a local URL for preview
      setImageURL(fileURL); // Set the image URL to preview it
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !description) {
      console.error("All fields must be filled");
      toast.error("All fields must be filled")
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("description", description);
    formData.append("file", file); // Append the file object

    try {
      const response = await axios.post(
        `https://socialpedia-backend-application.onrender.com/auth/${userId}/create/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log("Post created successfully:", response.data);

      dispatch(setPostShowFalse());
      // If backend returns the image URL, store it to display
      

      // Reset the form
      toast.success("Post created successfully");
      fetchPost();
      setDescription("");
      setImageURL(response.data.post.picturePath);
      setFile(null);
      
      return

    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      // toast.error("Error creating post:", error.response?.data || error.message);
    }
  };

  return (

    <div className=  " absolute top-0 left-0 w-full h-full flex items-center justify-center z-30 mt-10" 
    >

      <div className="bg-gradient-to-r from-pink-500 to-red-300 h-fit w-full max-w-2xl rounded-lg shadow-lg p-6 sm:p-3"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/813525644/photo/businessman-working-on-laptop-with-icons.jpg?s=612x612&w=0&k=20&c=IaeTx0lBmeWlHnelG15wx1abhbjs1ZMRzinJ4rsNj2I=')`, // Replace with your image URL
        backgroundSize: "cover", // Ensures the image covers the div
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}>
        {/* <h1 className="text-3xl font-bold mb-4 text-center bg-white rounded-md w-fit mx-auto p-2 text-red-600"> */}
        {/* <Typewriter
        words={["Create","Post"]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1000}
      /> */}
        {/* </h1> */}

        <div className="text-3xl font-bold mb-4 text-center bg-white rounded-md w-fit mx-auto p-2 text-red-600 capitalize font-serif overflow-hidden">
        <motion.h1
    className="whitespace-nowrap capitalize font-serif"
    animate={{ x: ["100%", "-100%"] }}
    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
  >
   Create Post !!!
  </motion.h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* File Input */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-2 border-rose-400 p-3 rounded-md w-full bg-white font-bold  text-red-700 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image Preview */}
          {imageURL && (
            <div className="mb-4">
              <img
                src={imageURL}
                alt="Image Preview"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          )}

          {/* Description Input */}
          <div className="mb-4 text-black">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description..."
              className="border-2 border-black p-3 rounded-md w-full focus:ring-2 focus:ring-indigo-400"
              rows="4"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-rose-400 text-white px-6 py-2 rounded-md border-2 border-white hover:bg-green-600 transition duration-300 w-full sm:w-auto"
            >
              Post
            </button>

            <button
              type="button"
              onClick={() => dispatch(setPostShowFalse())}
              className="bg-red-800 text-white px-6 py-2 rounded-md border-2 border-white hover:bg-red-900 transition duration-300 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostCreationForm;
