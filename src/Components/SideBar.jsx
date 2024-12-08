import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Person, Settings, ExitToApp,  } from "@mui/icons-material"; // MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from 'react-redux';
import { setPostShow, setUserProfile } from "../redux/createPost";
import { setLogin } from "../redux/user";
import { toast } from "react-toastify";
// import { toggleDarkMode } from '../redux/mode';
function SideBar() {
    const darkMode = useSelector((state)=> state.theme.darkMode);
    const postShow = useSelector((state)=> state.post.postShow);
    const userName = useSelector((state)=> state.user.userName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = ()=>{
     
      const payload = {
        name : "user"
      }
      dispatch(setLogin(payload))
      navigate('/');
      // setIsProfileEnable((pd)=> false)
      toast.success('User Logout!!');
    }
  return (
    <div className={`hidden md:flex md: flex-col items-start w-fit h-fit rounded-lg px-10 border-2 border-solid border-gray-400 border-t-0 font-serif capitalize cursor-pointer shadow-lg  ${darkMode ? 'bg-black' : 'bg-rose-400'} 
    ${darkMode ? 'text-white' : 'text-black'}  ${postShow ? "pointer-events-none opacity-50" : "enabled"}  p-5`} >
      {/* Facebook Logo */}
      <div className={`flex items-center italic justify-center mb-8 text-center  ${darkMode ? 'bg-black' : 'white'}`}>
        {/* < HomeIcon className="text-4xl text-black" /> */}
        <span className="ml-2 text-2xl font-semibold underline text-center">MyApp</span>
      </div>

      {/* Navigation Links */}
      <div className={`flex flex-col w-full  `}>
        <Link
          to="/"
          className={`flex items-center p-3 italic font-serif font-extrabold rounded-md hover:bg-white   mb-3`}
        >
          <Home className="mr-3 " />
          <span>Home</span>
        </Link>

        <Link
          to=""
          className={`flex  ${userName === 'user' ? "pointer-events-none opacity-50" : "enabled"} items-center italic p-3 rounded-md font-serif font-extrabold hover:bg-white mb-3 ${darkMode ? 'bg-black' : 'white'}`}
        >
          <Person className={`mr-3 ${userName === 'user' ? "pointer-events-none opacity-50" : "enabled"} }`}/>
          <span onClick={()=> {dispatch(setUserProfile())}}>Profile</span>
        </Link>

        <Link
          to=""
          className={`flex  ${userName === 'user' ? "pointer-events-none opacity-50" : "enabled"} items-center italic p-3 rounded-md font-serif font-extrabold hover:bg-white mb-3 ${darkMode ? 'bg-black' : 'white'}`}
        >
          <Person className="mr-3 " />
          <span onClick={()=>{dispatch(setPostShow())}}>Create Post</span>
        </Link>

        

        <Link
          to="/"
          className="flex items-center p-3 italic font-serif font-extrabold rounded-md hover:bg-white mb-3"
        >
          <Settings className="mr-3" />
          <span>Settings</span>
        </Link>

        <Link
          to="/"
          className={`flex  ${userName === 'user' ? "pointer-events-none opacity-50" : "enabled"} items-center italic p-3 rounded-md font-serif font-extrabold hover:bg-white mb-3 ${darkMode ? 'bg-black' : 'white'}`}
        >
          <ExitToApp className="mr-3" />
          <span onClick={logoutHandler}>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;


