import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UseFetch } from '../CustomHooks/UseFetch'
import { useSelector } from 'react-redux'
import Reserve from './Reserve'

const Hotels = () => {
    const [slidenumber,SetSlidenumber]=useState(0)
    const [open,Setopen]=useState(false)
    const [openModel,SetOpenModel]=useState(false)
    const location=useLocation()
    // console.log(location.pathname)
    const id=location.pathname.split("/")[2]
    // console.log(id)

    const {data,loading,error,refetchDate}=UseFetch(`https://booking-app-9q67.onrender.com/api/hotel/${id}`)
    const {user}=useSelector((state)=>state.second)
    console.log(user)


    const {dates,options}=useSelector((state)=>state.first)
    // console.log(dates)
    const PerDayInMilliSeconds=1000*60*60*24;
    const findDifference =(date2,date1) =>{
        const timeDiff=Math.abs(date2.getTime()-date1.getTime())
        const days=Math.ceil(timeDiff/PerDayInMilliSeconds)
        return days
    }

    const days=findDifference(dates[0].startDate,dates[0].endDate);
    // console.log(days)
   

    const navigate=useNavigate()

    const handlefunc = ((i)=>{
        SetSlidenumber(i);
        Setopen(true)
    })

    const handlearrow =((i)=>{
        let newOne

        if(i==='l'){
            newOne=slidenumber===0 ?data.photos.length-1:slidenumber-1
        }
        else{
            newOne=slidenumber===data.photos.length-1?0:slidenumber+1
        }

        SetSlidenumber(newOne)
    })
    

    const handleClick =()=>{
        if(user){
            console.log('Cricket')
            console.log(user) 
            console.log(SetOpenModel(true))
        }
        else{
            navigate("/login",{state:'Login to book the hotel'})
        }
    }
    console.log('rohitCaptaim')
    // console.log(data.photos)
  return (
    
    <div className='bg-black text-white pt-5 h-full '>

        {loading?<div className='display flex items-center justify-center text-3xl'>Loading.. </div>:
        <>
        <div className='flex flex-col items-center mt-5 '>
        {open && <div className='fixed top-0 left-0 w-100vw h-100vh z-20   flex items-center justify-around'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={()=>handlearrow('l')} stroke-width="1.5" stroke="currentColor" class="w-10 h-10 cursor-pointer bg-disco text-black rounded-full ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={()=>Setopen(false)} stroke-width="1.5" stroke="currentColor" class="w-10 cursor-pointer bg-disco text-black rounded-full h-10 absolute top-3 right-5 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <div className='flex justify-center items-center'>
                    <img className='w-60vw h-80vh' src={data.photos[slidenumber]} alt="" />
                </div>


                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={()=>handlearrow('r')} stroke-width="1.5" stroke="currentColor" class="w-10 h-10 cursor-pointer bg-disco text-black rounded-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>


            </div>
            }
         <div className={`w-full max-w-6xl flex flex-col gap-3 relative p-2 sm:p-0 ${open||openModel ? 'opacity-50' :'opacity-100'} `}>
               
            <button onClick={handleClick} className='hidden sm:block absolute right-0 border px-8 py-2 border-disco text-disco hover:text-white hover:bg-disco'>Reserve Now</button>
            <h1 className='text-center sm:text-left text-3xl text-disco font-bold'>{data.name}</h1>
            <div className='text-sm flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>  {data.address}</span>
            </div>
                <span className='text-disco'>{data.distance}</span>
                <span className='text-green-500'>Book this hotel room for just {data.CheapestPrice} rupees per nights</span>
                <span>1 king size bed.Free wifi.AC and so many more </span>
                {data.photos &&
                <div className='flex flex-wrap'>
                <>
                {data.photos.map((photo,i)=>(
                    <div className='w-32% '>
                        <img onClick={()=>handlefunc(i)} className='w-full object-cover' src={photo} alt="" />
                    </div>
                ))}
                
                </>
            </div>
            }

            <div className='flex flex-col sm:flex-row gap-3 mb-3'>
                <div className='flex-[3_3_0%]  flex  flex-col gap-3 '>
                    <h1 className='text-center sm:text-left text-disco font-bold text-3xl'>
                        {data.title}
                    </h1>
                    <p className='text-sm'>
                    {data.desc}
                    </p>
                </div>
                <div className='flex-1 flex flex-col border border-disco gap-2 p-2'>
                    <h1 className='text-2xl font-bold text-disco'>Perferct for {days}-night stay</h1>
                    <p>Located in nearby railway station it is good place to stay here excellent ratings and excellent facilities </p>
                    <b className='text-disco'>₹{options.room*days*data.CheapestPrice} ({days} night stay)</b>
                    <button onClick={handleClick}  className='border p-2 border-disco text-disco hover:text-white hover:bg-disco'>Reserve now</button>
                </div>
            </div>
        </div>
                    {/* <h1>Hello</h1> */}
          {openModel && <Reserve setOpenModel={SetOpenModel} id={id}/>}
        </div>
        </>
        }
    </div>
  )
}

export default Hotels