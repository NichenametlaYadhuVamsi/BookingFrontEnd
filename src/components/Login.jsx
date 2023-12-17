import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, json, useLocation, useNavigate} from "react-router-dom"
const Login = () => {
    const [details,setDetails]=useState({
        email:undefined,
        password:undefined
    })
    const location =useLocation()
    const [message,setMessage]=useState(location.state)
    const navigate=useNavigate()
    const {loading,error,user} =useSelector((state)=>state.second)
    const dispatch=useDispatch()

    const handleChange =(e)=>{
        setDetails(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleClick =async (e)=>{
        e.preventDefault()
        dispatch({type:'LoginStart'})
        try{
            let res=await axios.post('https://booking-app-9q67.onrender.com/api/auth/login',details)
            dispatch({type:'LoginFinish',payload:res.data})
            console.log(user)
            //localStorage.setItem("user",JSON.stringify(user))
            //console.log('I love You')
            //console.log(JSON.parse(localStorage.getItem("user")))
            navigate("/")
        }
        catch(err){
            dispatch({type:'LoginFailed',payload:err.response.data})
        }

    }

  return (
    <div className='bg-black text-white h-100vh flex justify-center items-center'>
        <div className='bg-black border border-disco  flex flex-col gap-5 py-4 px-10 rounded-md' >
            <h1 className='text-center text-2xl'>Login</h1>
        <input className='bg-black border border-disco outline-none p-2' type="email" placeholder='Email' id='email' onChange={handleChange}/>
        <input className='bg-black border border-disco outline-none p-2' type="password" placeholder='Password' id='password' onChange={handleChange} />
        <button disabled={loading} className='p-3 w-full border border-disco hover:bg-disco' onClick={handleClick}>Search</button>
        <div className=' w-full flex flex-row justify-end gap-2'>
        <span>New User? {''}</span>
            <button className=' hover:text-disco'>
                <Link to={"/register"}>Sign in</Link>
             </button>
        </div>
        {error  && <span className='text-red-500'>{error.message}</span>}
        {message && <span className='text-red-500'>{message}</span>}
        </div>
    </div>
  )
}

export default Login