import { useEffect, useState } from "react"
import axios from "axios"

export const UseFetch =(url)=>{
    const[data,setData]=useState([])
    const[loading,setloading]=useState(false)
    const[error,setError]=useState(false)

    useEffect(()=>{
        const fetchDate=async()=>{
            setloading(true)
            // console.log('Vamsi')
            try{
                // console.log(url)
                let res=await axios.get(url)
                // console.log('vamsi')
                setData(res.data)
                // console.log('Vamsi')
                // console.log(res)
            }
            catch(err){
                setError(err)
                // console.log(err)
            }
            setloading(false)
        }
        fetchDate()
    },[])

    let refetchDate=async()=>{
        
            setloading(true)
            // console.log('Vamsi')
            try{
                // console.log(url)
                let res=await axios.get(url)
                // console.log('vamsi')
                setData(res.data)
                // console.log('Vamsi')
                // console.log(res)
            }
            catch(err){
                setError(err)
                // console.log(err)
            }
            setloading(false)
        
    }
    
    return {data,loading,error,refetchDate}

}