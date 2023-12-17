import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {

  // const user=JSON.parse(localStorage.getItem("user"))
  const {user}=useSelector((state)=>state.second)
  const [user1,setUser1] =useState(user)
  useEffect (()=>{
    setUser1(user)
  },[user])
  const dispatch=useDispatch()
  const handelClick = async ()=>{
    dispatch({type:'LogoutStart'})
      try{
        console.log('I love you')
        let res=await axios.get('https://booking-app-9q67.onrender.com/api/auth/logout')
        dispatch({type:'LogoutFinish'})
        // console.log(user)
        //localStorage.setItem("user",JSON.stringify(user))
        //console.log('I love You')
        //console.log(JSON.parse(localStorage.getItem("user")))
        navigate("/")
    }
    catch(err){
      console.log(err)
      dispatch({type:'LogoutFailed',payload:err.response.data})
    }
  }
  let navigate=useNavigate()
 
  // console.log('Vamsi')
  // console.log(user.name)
  return (
    <div className="bg-light-dark text-white pb-12" >
    <header className='p-6 flex justify-between' >
      <a href="" className='flex gap-2 items-center '>
          <img src="../../travelstay-logo (2).png" className="w-8" alt="" />
          <Link to="/">
          <div className='text-disco font-bold text-xl'> Travel Stay </div>
          </Link>
        </a>

        
      
        <div className='flex  gap-2' >
          {user1 ? 
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-1'>
                <div className='text-3xl text-disco'>{user1.name}</div> 
               
            </div>
         
          
          <button onClick={handelClick}  className='border p-2 border-disco text-disco hover:text-white hover:bg-disco'>
             Logout 
          </button>
          </div>
          : <>
          <button className='border p-2 border-disco text-disco hover:text-white hover:bg-disco'>
            <Link to={"/register"}>Register</Link>
            </button>
          <button className='border p-2 border-disco text-disco hover:text-white hover:bg-disco hidden sm:block'>
          <Link to={"/login"}>Login</Link>
          </button>
          </>

        }
        </div>


      

        
    </header>
    </div>
  )
}

export default Navbar