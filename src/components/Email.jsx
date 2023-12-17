import React from 'react'

const Email = () => {
  return (
    <div className='bg-disco h-full text-white flex flex-col items-center justify-center h-40 gap-2'>
        <div className=' mt-5 mb-7 flex flex-col gap-2 '>
            <div className='text-center font-bold text-2xl'>Efficiency and cost-effectiveness at your fingertips!</div>
            <div className='text-center text-xl '>Enroll today, and let us send you top-notch deals to help you save.</div>
            <div className='flex flex-col gap-2 md:flex-row justify-between'>
            <input className='mr-3 w-full p-4 h-12 text-black'  type="email" placeholder='Your Email Address' />
            <button className='bg-black p-3 border border-disco rounded-md text-disco '> Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Email