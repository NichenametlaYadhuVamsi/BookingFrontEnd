import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import {format} from "date-fns";
import Navbar from './Navbar';
import Featured from './Featured';
import Email from './Email';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const navigate=useNavigate()
  const handleOptions =(name,value)=>{
    setOptions(prev=>{
      return {
        ...prev,[name]: value==='i' ?options[name]+1 :options[name]-1
      }
    })
  }
  const[destination,setDestination]=useState('')
  const[openDate,setOpenDate]=useState(false)
  const [openOptions,setOpenOptions]=useState(false)
  const[options,setOptions]=useState({
    adult:1,
    children:0,
    room:1,
  })

  const currentDate = new Date();
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(currentDate.getTime() + 86400000),
      key: 'selection'
    }
  ]);
  // const [user,setUser]=useState(useSelector((state)=>state.second.user))
  
  const {user}=useSelector((state)=>state.second)
  const dispatch =useDispatch()
  const handleSearch =() =>{
    // console.log('I love vamsi')
    // console.log(dates)
    if(user){
    dispatch({
      type : "NewSearch",
      payload:{destination,dates,options}
    })
    navigate('/hotels' ,{state:{destination,dates,options}})
    }
    else{
      navigate("/login",{state:'Login to search Hotels'})
    }
  }
  const handleFunc=()=>{
    if(user){
    dispatch({
      type : "NewSearch",
      payload:{destination,dates,options}
    })
    navigate('/fav' ,{state:{destination,dates,options}})
    }
    else{
      navigate("/login",{state:'Login for adding your fav hotels'})
    }
  }
  
  return (
    <>
    <div className='bg-black h-full text-white ' >
      <div className="bg-light-dark text-white pb-12" >

        <div className='pt-6 ml-4 mr-4' >
          <div className='flex justify-between'>
            
            <div className='text-disco font-bold text-5xl '>Book Your Next Adventure</div>
            {user? <div className='text-disco font-bold text-5xl cursor-pointer ' onClick={handleFunc}>Fav♡</div>:<div></div>}
            </div>
            <div className=' text-xl mt-3'> "Unleash Your Next Adventure from the Comfort of Home!</div>
          
          <div className='mt-6 flex flex-col md:flex-row gap-2 md:gap-0 bg-black justify-around items-start md:items-center px-2 md:px-0 py-3 absolute bottom-0.2 w-92% md:w-96% max-w-7xl border border-disco rounded-sm  '>
            <div className='flex gap-1 w-full md:w-21%  border p-2 border-disco '>
            <img src="../../travelstay-logo (3).png" className="w-8" alt="" />
            <input required className='w-full md:w-25  border-none outline-none bg-black' onChange={(e)=>{setDestination(e.target.value)}}  type='text' placeholder='Search Chennai' />
            </div>

            <div className=' flex gap-1 w-full md:w-32% border p-2 border-disco relative'>
            <img src="../../travelstay-logo (4).png" className="w-5" alt="" />
            <span className='hover:cursor-pointer' onClick={()=> setOpenDate(!openDate)}>{format(dates[0].startDate,"dd/MM/yyyy")} to {format(dates[0].endDate,"dd/MM/yyyy")}</span>
            {openDate && <DateRange  className='absolute top-2.5rem md:top-4.2rem z-20 '
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            minDate={new Date()}
            
          />
        }
            </div>
            <div className='flex gap-1 w-full md:w-32% border p-2 border-disco' >
            <img src="../../travelstay-logo (5).png" className="w-4" alt="" />
            <span onClick={()=>{
              setOpenOptions(!openOptions)
              
            }} className='cursor-pointer'>{ `${options.adult} adult ${options.children} children ${options.room} room`} </span>
            </div>
            {
              openOptions &&
            <div className='z-20 border rounded-md absolute top-9.2rem md:top-4.2rem md:right-21%  bg-white text-black w-48 p-2 z-20'>
              <div className='w-full flex justify-between' >
                <span>Adult</span>
                <div className='flex items-center gap-5'>
                <button disabled={options.adult<=1} className='border border-disco color-disco px-2 disabled:cursor-not-allowed' onClick={()=>handleOptions("adult","d")}>-</button>
                <span>{options.adult}</span>
                <button  className='border border-disco color-disco px-2' onClick={()=>handleOptions("adult","i")}>+</button>
                </div>
              </div>
              <div className='w-full flex justify-between mt-2'>
                <span>Children</span>
                <div className='flex items-center gap-5'>
                <button disabled={options.children<=0} className='border border-disco color-disco px-2 disabled:cursor-not-allowed'  onClick={()=>handleOptions("children","d")}>-</button>
                <span>{options.children}</span>
                <button className='border border-disco color-disco px-2' onClick={()=>handleOptions("children","i")}>+</button>
                </div>
              </div>
              <div className='w-full flex justify-between mt-2'>
                <span>Room</span>
                <div className='flex items-center gap-5'>
                <button disabled={options.room<=1} className='border border-disco color-disco px-2 disabled:cursor-not-allowed'  onClick={()=>handleOptions("room","d")}>-</button>
                <span>{options.room}</span>
                <button className='border border-disco color-disco px-2' onClick={()=>handleOptions("room","i")}>+</button>
                </div>
              </div>
            </div>
            }
            <div className='w-full md:w-14'>
            
              <button className='w-full border p-1 text-white bg-disco ' onClick={()=>handleSearch()}>Search</button>

            </div>

          </div>
            


        </div>
    </div>
    <div>
    <h1 className='z-10 mt-14.25rem md:mt-20 font-bold text-3xl md:text-5xl text-disco flex justify-center'>Hotels In Chennai</h1>
      <Featured/>
    </div>
  </div>

  </>
  )
}

export default Home