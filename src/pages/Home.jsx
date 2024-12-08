import React from "react";

import Navbar from "../Components/Navbar";
import MainPage from "./MainPage";
// import FriendAdd from "./FriendAdd";

const Home = () => {
  return (
    <>
    <Navbar className='relative z-20'/>
    <div className="flex items-center justify-around">
    <MainPage/>
    </div>
   
   
    </>
  );
};

export default Home;
