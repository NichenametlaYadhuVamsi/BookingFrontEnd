import React, { useState } from 'react'
import { UseFetch } from '../CustomHooks/UseFetch'
import { useSelector } from 'react-redux'
import { useLoaderData, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reserve = ({setOpenModel,id}) => {

    // console.log(open)
    const [selectedRooms,setSelectedRooms]=useState([])
    const {data,loading,error}=UseFetch(`https://booking-app-9q67.onrender.com/api/rooms/${id}`)
    const {dates}=useSelector((state)=>state.first)

    const getDateRange= (startDate,endDate)=>{
        const start=new Date(startDate)
        const end=new Date(endDate)
        const date=new Date(start.getTime())
        let dates=[]

        while(date<=end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return dates
    }

    const allDates =getDateRange(dates[0].startDate,dates[0].endDate)
    console.log(allDates)

    const isAvailable =(room)=>{
        console.log('Vamsi')
        const array=room.unAvailableDates
        array.map(item=>(
            console.log(new Date(item).getTime())
        ))

        console.log(allDates)
        const isFound =room.unAvailableDates.some(date=>
            // console.log(date),
            // console.log(date),
            allDates.includes(new Date(date).getTime())
        )

        // console.log('I love you1')
        // console.log(isFound)

        return !isFound
    } 
    console.log(allDates)
    const handleRoom =(e)=>{
        const checked=e.target.checked
        const value=e.target.value
        // console.log('Vamsi Kohli')
        // console.log(checked)
        // console.log(value)

        setSelectedRooms(checked ? [...selectedRooms,value] : selectedRooms.filter(item=>item!=value))
    }
    const navigate=useNavigate()

    const handleClick =async ()=>{
        try{

            console.log(selectedRooms);
            console.log(allDates)
            await Promise.all(selectedRooms.map(roomId=>{
                // console.log(roomId)
                const res=axios.put(`http://localhost:8000/api/rooms/roomupdate/${roomId}`,{dates:allDates})

                // console.log('Vorat')
                console.log(res.data)
               })
            )


            setOpenModel(false)
            navigate("/")

        }
        catch(err){
            console.log(err)
        }
    }
    // console.log('VamsiVirat')
    // console.log(selectedRooms)
  return (
    <div className='w-100vw h-100vh fixed top-0 left-0 flex items-center justify-center'>
        {loading ?<div className='justify-center text-disco text-xl'>Loading...</div>:
        <div className='bg-black p-5 relative flex flex-col items-center'>
            <div className='w-full text-center text-xl text-disco'>Select rooms </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={()=>setOpenModel(false)} stroke-width="1.5" stroke="currentColor" class="w-5 h-5 cursor-pointer bg-disco text-black rounded-full  absolute top-0 right-0 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            {data.map(item=>(
                <div className='flex gap-5 items-center justify-center p-5'>
                    <div className='flex flex-col '>
                        <div className='font-medium'>{item.title}</div>
                        <div className='font-light'>{item.desc}</div>
                        <div className='text-sm'>Max People :{item.MaxPeople}</div>
                        <div> ₹{item.Price}</div>

                       
                    </div>
                    <div className='flex gap-3 flex-wrap text-sm text-gray-300'>
                            {
                                item.roomNumbers.map(room=>(
                                    <div className='flex flex-col'>
                                    <label>{room.number}</label>
                                    <input disabled={!isAvailable(room)} type="checkbox" value={room._id} onChange={handleRoom} />
                                    </div>
                                ))
                            }
                    </div>
                </div>
            ))}

            <button onClick={handleClick} className='border p-2 border-disco text-disco hover:text-white hover:bg-disco' >Reserve Now!</button>
        
        </div>
        }
    </div>
  )
}

export default Reserve