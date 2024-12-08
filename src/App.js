// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import SearchPage from './pages/SearchPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signin' element={<ProfilePage/>}></Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/home' element={<Home/>}></Route>
      

    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
