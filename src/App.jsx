import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Route,Routes }from "react-router-dom" 
import Home from './components/Home'
import Navbar from './components/Navbar'
import Email from './components/Email'
import Lists from './components/Lists'
import Hotels from './components/Hotels'
import Login from './components/Login'
import Register from './components/Register'
import Favourites from './components/Favourites'
// import { Favourite } from '../../Api/Controller.js/users'
// import Favourites from './components/Favourites'

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('shouldRedirectToHome', 'true');
      
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const shouldRedirect = sessionStorage.getItem('shouldRedirectToHome');
  if (shouldRedirect) {
    sessionStorage.removeItem('shouldRedirectToHome');
    window.location.replace('/');
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<Lists/>}/>
        <Route path='/hotels/:id' element={<Hotels/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/fav' element={<Favourites/>}/>
        
      </Routes>
      <Email/>
    </Router>
  )
}

export default App
