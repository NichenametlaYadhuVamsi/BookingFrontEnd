import React from 'react'
import { UseFetch } from '../CustomHooks/UseFetch'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Featured = () => {
   let {data,loading,error}=UseFetch("https://booking-app-9q67.onrender.com/api/hotel/all/?feature=true&limit=3")
  return (
    <div className='mt-20 p-2  w-full max-w-7xl flex flex-wrap  justify-center gap-10 z-0'>
      {loading===true?"loading...":error?<div>An error occurred while fetching data.</div>:
        <>
        
        {
           data.map((item)=>( 
                      
            <div key={item._id}className='relative overflow-hidden h-22rem'>
            <img   className=' object-cover' src={item.photos[0]} width='350' alt="No net" />
            <h1  className='text-5xl bottom-12 text-disco font-bold absolute'>{item.name}</h1>
            </div>
          ))
        } 
        </>
      

      
      }
    </div>

    
  )
}

export default Featured