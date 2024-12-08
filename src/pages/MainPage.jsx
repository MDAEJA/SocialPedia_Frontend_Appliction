import React, { useState } from 'react'
import SideBar from '../Components/SideBar'
import PostCreationForm from './PostCreationForm'
import { useSelector } from 'react-redux'
import PostPage from './PostPage';
import UserProfile from './UserProfile';



function MainPage() {
  const createPostShow = useSelector((state)=> state.post.postShow);
  const userProfileShow = useSelector((state)=> state.post.userProfile)
  

  return (
   <>
   <div className='flex items-center justify-center gap-5'
   >
  
   {
    createPostShow === true && 
    <PostCreationForm />
   }
   {
    (userProfileShow) ? <UserProfile/> : <PostPage/>
   }
   

   
 
   </div>
   
   </>
  )
}

export default MainPage
