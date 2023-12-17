import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useLocation, useNavigate } from 'react-router-dom'
import SearcItem from './SearcItem'
import { UseFetch } from '../CustomHooks/UseFetch'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Lists = () => {

    const location=useLocation()
    const navigate=useNavigate()
    const[destination,setDestination]=useState(location.state.destination)
    const[dates,setDate]=useState(location.state.dates)
    const[options,setOptions]=useState(location.state.options)
    const[openDate,setOpenDate]=useState(false)
    const [userFavourite,setUserFavourite]=useState([])
    const dispatch=useDispatch()
    let[min,SetMin]=useState(1)
    let [max,SetMax]=useState(9999)
    const [user,setUser]=useState(useSelector((state)=>state.second.user))
    let {data,loading,error,refetchDate}=UseFetch(`https://booking-app-9q67.onrender.com/api/hotel/all/?city=${destination}&min=${min}&max=${max}`)
    let load= UseFetch(`https://booking-app-9q67.onrender.com/api/api/user/fav/${user._id}`); 
    
    // console.log(load.data)
    
    const handleClick=()=>{
        refetchDate()
    }
    useEffect(()=>{
        console.log(user)
    },[user])
    const [loadingFav,setLoadingFav]=useState(false)
    const handleToggleFavourite=async(hotelId)=>{
        setLoadingFav(true)
        try{
            console.log('I love you')
            if(user.favourite.includes(hotelId)){
                await axios.post(`https://booking-app-9q67.onrender.com/api/user/fav/${user._id}`,{hotelId:hotelId})
            
            }
            else{
                await axios.put(`https://booking-app-9q67.onrender.com/api/user/fav/${user._id}`,{hotelId:hotelId})
               
            }
           
        
            const response=await axios.get(`https://booking-app-9q67.onrender.com/api/user/${user._id}`)
            
            setLoadingFav(false)        
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
    
    // const dispatch=useDispatch()


  return (
    <div className='bg-black text-white pt-5 h-full'>
        <div className='flex justify-center '  >
            <div className='flex flex-col md:flex-row w-full max-w-6xl gap-2 '>
                <div className='border border-disco flex-1 h-36rem p-3 rounded-md' >
                        <h1 className='font-bold text-black text-xl mb-2'>Search</h1>
                        <div className='flex flex-col gap-2 mb-2'>
                            <h1 className='text-center text-xl font-bold text-disco'>Destination</h1>
                            <input type='text' className='p-1 border border-disco outline-none text-white bg-black ' onChange={(e)=>setDestination(e.target.value)} placeholder={destination} />
                        </div>

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

                        <div className='' >
                            <h1 className='mb-3 mt-3 text-center font-bold text-disco text-xl'>Filters</h1>
                            <div className='flex flex-row md:flex-col overflow-auto gap-2 md:gap-0'>
                            <div className='flex justify-between mb-4 gap-2 md:gap-0'>
                                <span>Min price <small className='hidden md:block'>per night</small></span>
                                <input  className='text-center h-14 md:h-7 w-14 hover:cursor-pointer flex items-center text-white bg-black outline-none border border-disco' onChange={(e)=>{SetMin(e.target.value)}} min={1} type='number'  />
                            </div>
                            <div className='flex justify-between mb-4 gap-2 md:gap-0' >
                                <span>Max price <small className='hidden md:block'>per night</small></span>
                                <input className='text-center h-14 md:h-7  w-14 hover:cursor-pointer flex items-center text-white bg-black outline-none border border-disco' onChange={(e)=>{SetMax(e.target.value)}} min={1} type='number'  />
                            </div>
                            <div className='flex justify-between mb-4 gap-2 md:gap-0' > 
                                <span>Adult </span>
                                <input className='text-center h-14 md:h-7 w-14 hover:cursor-pointer flex items-center text-white bg-black outline-none border border-disco' min={1} type='number' placeholder={options.adult}  />
                            </div>
                            <div className='flex justify-between mb-4 gap-2 md:gap-0 '>
                                <span>Children </span>
                                <input className='text-center h-14 md:h-7 w-14 hover:cursor-pointer flex items-center text-white bg-black outline-none border border-disco' min={0} type='number' placeholder={options.children}  />
                            </div>
                            <div className='flex justify-between mb-4 gap-2 md:gap-0'>
                                <span>Room</span>
                                <input className='text-center h-14 md:h-7 w-14 hover:cursor-pointer flex items-center text-white bg-black outline-none border border-disco' min={1} type='number' placeholder={options.room}  />
                            </div>
                            </div>

                        </div>

                        <button className='p-3 bg-disco text-white w-full' onClick={handleClick}>Search</button>
                </div>
                <div className='flex-[3_3_0%]'>
                
                {loading && load.loading ?<div className='flex justify-center items-center text-5xl '>Loading...</div>:
                    <>
                    {data.map((item)=>(

                        <SearcItem loadingFav={loadingFav} handleToggleFavourite={handleToggleFavourite} isFav={user.favourite.includes(item._id)}  key={item._id} item={item} destination={destination} dates={dates} options={options}  />
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

export default Lists