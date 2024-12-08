import React, { useState } from 'react';
import HomeIcon from "@mui/icons-material/Home";
import { AccountCircle, ArrowDropDown, ArrowDropUp, Clear, DarkMode, Help, LightMode, Menu, Message, Notifications, Search } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/mode';
import { setLogin } from '../redux/user';
import { toast } from 'react-toastify';
import UserProfile from '../pages/UserProfile';



function Navbar() {
  const[isProfileEnable,setIsProfileEnable] = useState(false);
  const[isMobileProfileEnable,setIsMobileProfile] = useState(false);
  const[isTabProfileEnable,setIsTabProfile] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state)=> state.theme.darkMode);
  const dispatch = useDispatch();
  const userName = useSelector((state)=> state.user.userName);
  const postShow = useSelector((state)=> state.post.postShow);
  const userPicture = useSelector((state) => state.user.picturePath);

  const logoutHandler = ()=>{
    if(userName === 'user'){
      toast.error("Please Login");
      return;
    }
    const payload = {
      name : "user"
    }
    dispatch(setLogin(payload))
    navigate('/');
    setIsProfileEnable((pd)=> false)
    toast.success('User Logout!!');
  }
  return (
    // main nav bar section
    <div
  className={`rounded-lg z-40 sticky top-0 left-0 w-full h-fit flex items-center justify-evenly p-1 
    ${postShow ? "pointer-events-none opacity-50" : "enabled"}
    ${darkMode ? 'bg-black' : 'bg-rose-400'} 
    font-serif capitalize cursor-pointer shadow-lg z-50 
    ${darkMode ? 'text-white' : 'text-black'} text-bold rounded-lg transform transition duration-3000`}
>
      {/* logo name serachbar */}
      <div className=' rounded-lg w-auto p-2 flex items-center gap-5'>

      <div className="flex items-center space-x-4">
       <a href='/'> <HomeIcon className={` ${darkMode ? 'text-white' : 'text-black'} cursor-pointer" onClick={()=>{navigate('/')}}`}/> </a>
        <a href="/" className={` hover:underline font-extrabold ${darkMode ? 'text-white' : 'text-black'} font-bold cursor-pointer`}>
          Sociopedia
        </a>
      </div>

      {/* Center Section: Search Bar */}
      <div className="relative hidden sm:block w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-solid border-gray-300  rounded-lg w-full px-10 py-2 focus:outline-none"
          onClick={()=>{navigate('/search')}}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
      </div>

      </div>

      <div className='flex items-center justify-center sm:hidden'>
      {
        darkMode ? <LightMode className='mx-2' onClick={()=>{
          dispatch(toggleDarkMode());
        }}/> : <DarkMode className='mx-2' onClick={()=>{
          dispatch(toggleDarkMode());
        }}/>
      }
        <AccountCircle/>
        {
           !isMobileProfileEnable ? <Menu className='cursor-pointer' onClick={()=>{
            setIsMobileProfile((pd)=> true)
           }}/> : <Clear className='cursor-pointer' onClick={()=>{
            setIsMobileProfile((pd)=> false)
           }}/>
        }
      </div>

      <div className='relative hidden  sm:flex items-center justify-center lg:hidden'>
      {
        darkMode ? <LightMode className='mx-2' onClick={()=>{
          dispatch(toggleDarkMode());
        }}/> : <DarkMode className='mx-2' onClick={()=>{
          dispatch(toggleDarkMode());
        }}/>
      }
      <AccountCircle/>
      <div className='flex text-center p-2 items-center justify-around'>
        <h3>{userName}</h3>
        {
          !isProfileEnable  ? <ArrowDropUp className='cursor-pointer' onClick = {()=>{
            setIsProfileEnable((pd)=> true)
          }}/> : <ArrowDropDown className='cursor-pointer' onClick = {()=>{
            setIsProfileEnable((pd)=> false)
          }}/>
        }

{
          isProfileEnable && 
        <div className=''>
          <ul className='flex-col items-start gap-12'>
            {
               userName === 'user' && 
               <li className='bg-white p-1 capitalize rounded-md m-2' onClick={()=> navigate('/login')}>Login</li>
            }
            
            <li className='bg-white p-1 capitalize rounded-md'>logout</li>
          </ul>
        </div>
        }
      </div>
       {
        !isTabProfileEnable ? <Menu onClick={()=>{
          setIsTabProfile((pd)=> true)
        }}/> : <Clear onClick={()=>{
          setIsTabProfile((pd)=> false)
        }}/>
       }
      
      </div>


      <div className='relative hidden sm:hidden lg:flex items-center gap-5 '>
      <img
          src={ userPicture || 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white "
        />
      {
        darkMode ? <LightMode onClick={()=>{
          dispatch(toggleDarkMode());
        }}/> : <DarkMode onClick={()=>{
          dispatch(toggleDarkMode());
        }}/>
      }
      {/* <DarkMode onClick={()=> console.log(darkMode)}/> */}
      <Message/>
      <Notifications/>
      <Help/>
      <div className='flex text-center p-2 items-center justify-center'>
        <h3 className='font-serif font-semibold hover:underline'>{userName}</h3>
        {
          !isProfileEnable  ? <ArrowDropUp className='cursor-pointer mt-2' onClick = {()=>{
            setIsProfileEnable((pd)=> true)
          }}/> : <ArrowDropDown className='cursor-pointer mt-2' onClick = {()=>{
            setIsProfileEnable((pd)=> false)
          }}/>
        }
       
        {
          isProfileEnable && 
        <div className='absolute left-72 top-5 transform -translate-y-1/2 ml-5 text-red-700 '>
          <ul className='flex-col items-start gap-12'>
            {/* { */}
              {/* userName === 'user' &&  */}
              <li className={`bg-white px-s capitalize rounded-md p-0.5 mt-2 hover:underline ${userName === 'user' ? "enabled" : "pointer-events-none opacity-50" } `} onClick={()=>{
                navigate('/login');
              }}>{userName === 'user' ? 'Login' : userName }</li>
            {/* } */}
            
            <li className='bg-white px-2  capitalize rounded-md p-0.5 mt-1 hover:underline' onClick={logoutHandler}>logout</li>
          </ul>
        </div>
        }
        
      </div>
      {/* <Menu/> */}
      </div>

      {
        isMobileProfileEnable && 
        <div className='absolute top-10 left-0 w-full h-fit p-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200  shadow-lg z-50 text-red-600 font-serif capitalize sm:hidden'>
        <ul className='style'>
          {
            userName === 'user' && 
            <li className='bg-white p-1 capitalize rounded-md mb-1' onClick={()=> navigate('/login')}>Login</li>
          }
          {
            userName !== 'user' && 
            <li className='bg-white p-1 capitalize rounded-md mb-1' >{userName}</li>
          }
          <li className='bg-white p-1 capitalize rounded-md mb-1'>Logout</li>
          
        </ul>
      </div>
      }

{
        isTabProfileEnable && 
        <div className='sm:absolute top-10 left-0 mt-5 w-full h-fit p-2 bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200  shadow-lg z-50 text-red-600 font-serif capitalize lg:hidden'>
        <ul className='style'>
          {
            userName === 'user' && 
            <li className='bg-white p-1 capitalize rounded-md mb-1 mx-20 font-serif' onClick={()=> navigate('/login')}>Login</li>
          }
          {
              userName !== 'user' && 
              <li className='bg-white p-1 capitalize rounded-md mb-1 mx-20 font-serif' >{userName}</li>
          }
          
          <li className='bg-white p-1 capitalize rounded-md mb-1 mx-20'>Logout</li>
        </ul>
      </div>
      }

      
    </div>
  );
}

export default Navbar;
