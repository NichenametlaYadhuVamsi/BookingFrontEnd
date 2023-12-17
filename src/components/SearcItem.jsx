import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const SearcItem = ({loadingFav,handleToggleFavourite,isFav,item,destination,dates,options}) => {
    console.log(isFav)
    console.log(item._id)
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const handleSearch=()=>{
        dispatch({
            type : "NewSearch",
            payload:{destination,dates,options}
          })
        navigate(`/hotels/${item._id}`)
    }
    // console.log('I love you')
    console.log(dates)
  return (
    <div className='border border-disco flex flex-col  sm:flex-row gap-7 py-3 px-2 overflow-auto mb-2' >
        <div className='w-full  sm:w-auto flex  justify-center sm: md:justify-normal'>
        <img className=' object-cover h-10.5rem w-7.5rem md:w-14.25rem' src={item.photos[0]} width='300'  alt="" />
        </div>
        <div className='flex flex-col gap-5 flex-[2_2_0%]'>
            <h1 className='font-bold text-2xl text-disco'>{item.name}</h1>
            <span className='font-bold'>{item.distance}</span>
            <span className=''> {item.desc} </span>
            <span className=''>Free Cancellation</span>
        </div>
        <div className='flex-1 flex flex-col justify-between '>
            <div className='flex items-center justify-between'>
                <span>Super </span>
                {loadingFav?<>
                
                <div></div>
                </>
                :
                <>
                

                {isFav ?
                <span  onClick={()=>handleToggleFavourite(item._id)} className='text-2xl  text-red-900 cursor-pointer'>🧡</span>
                :
                <span onClick={()=>handleToggleFavourite(item._id)}  className='text-3xl  text-red-900 cursor-pointer'>♡</span> 
                
                }

                </>

                }
                
                {/* <i class="fa fa-gratipay" aria-hidden="true"></i> */}
                {/* <i className='text-white' class="fa fa-heart-o" aria-hidden="true"></i> */}
                <button className='bg-disco p-2 px-4 font-bold flex gap-1 '> {item.rating}
               

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 font-semibold h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg></button>
            </div>
            <div className='text-right flex flex-col gap-3'>
                <div className='font-bold text-3xl'>{item.CheapestPrice} ₹</div>
                <div className='text-gray-300 text-md'>Included Gst</div>
                {/* <Link to={`/hotels/${item._id}`}> */}
                   <button className='border md:p-3 border-disco text-disco hover:text-white hover:bg-disco' onClick={handleSearch}>View more details</button>
                {/* </Link> */}
            </div>
            
        </div>
    </div>
  )
}

export default SearcItem