import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useLocation, useNavigate } from 'react-router-dom'
import SearcItem from './SearcItem'
import { UseFetch } from '../CustomHooks/UseFetch'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Favourites = () => {
    const location=useLocation()
    const[destination,setDestination]=useState(location.state.destination)
    const[dates,setDate]=useState(location.state.dates)
    const[options,setOptions]=useState(location.state.options)
    const[openDate,setOpenDate]=useState(false)
    const dispatch=useDispatch()
    const [user,setUser]=useState(useSelector((state)=>state.second.user))
    let {data,loading,error,refetchDate}=UseFetch(`https://booking-app-9q67.onrender.com/api/hotel/all`)
    let load= UseFetch(`http://localhost:8000/api/user/fav/${user._id}`); 
    const handleClick=()=>{
        refetchDate()
    }
    const handleToggleFavourite=async(hotelId)=>{
        try{
            console.log('I love you')
            if(user.favourite.includes(hotelId)){
                await axios.post(`http://localhost:8000/api/user/fav/${user._id}`,{hotelId:hotelId})
            
            }
            else{
                await axios.put(`http://localhost:8000/api/user/fav/${user._id}`,{hotelId:hotelId})
               
            }
           
            
            const response=await axios.get(`http://localhost:8000/api/user/${user._id}`)
            
            
            let usering=response.data
            console.log("I love you too")
            await setUser(usering)
           
            dispatch({type:'LoginFinish',payload:response.data})
            
            setUser(usering)
             localStorage.removeItem('user');
             localStorage.setItem('user', JSON.stringify(usering))
            console.log(user)
            
            
        }
        catch{

        }
    }
  return (
    <div className='bg-black text-white pt-5 '>
        <div className='text-disco text-center text-5xl mb-5'>Favourite Hotels</div>
        <div className='flex justify-center h-36rem'  >
            <div className='flex flex-col md:flex-row w-full max-w-6xl gap-2 '>
                <div className='border border-disco flex-1 p-3 rounded-md' >
                        
                        

                        <div className='flex flex-col gap-1'>
                            <label className='text-center text-xl font-bold text-disco' >Checkin and Checkout date</label>
                            <span className='hover:cursor-pointer p-3  flex items-center text-white border border-disco' onClick={()=> setOpenDate(!openDate)}>{format(dates[0].startDate,"dd/MM/yyyy")} to {format(dates[0].endDate,"dd/MM/yyyy")}</span>
                           {openDate && < DateRange
                             onChange={item => setDate([item.selection])}
                             minDate={new Date()}
                             ranges={dates}
                            
                            />
                           }


                        </div>

                        

                        <button className='p-3 bg-disco text-white w-full' onClick={handleClick}>Search</button>
                </div>
                <div className='flex-[3_3_0%]'>
                
                {loading && load.loading ?<div className='flex justify-center items-center text-5xl '>Loading...</div>:
                    <>
                    {data
                    .filter((item) => user.favourite.includes(item._id))
                    .map((item)=>(

                        <SearcItem handleToggleFavourite={handleToggleFavourite} isFav={user.favourite.includes(item._id)}  key={item._id} item={item} destination={destination} dates={dates} options={options}  />
                        ))
                    }
                    </>
                }

                </div>
            </div>
        </div>
    </div>
  )
}

export default Favourites