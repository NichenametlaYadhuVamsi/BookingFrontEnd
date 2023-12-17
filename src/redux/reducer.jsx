import {createReducer} from "@reduxjs/toolkit"
export const firstReducer=createReducer(
    {
        city:"",
        dates:[],
        options:{
            adult:1,
            rooms:1,
            children:0,
        },
        coins :0

    },
    {
        NewSearch :(state,action)=>{
            state.coins++;
            console.log('Hello')
            console.log(action.payload)
            state.city=action.payload.destination;
            state.dates=action.payload.dates;
            state.options=action.payload.options;
        }
    }
)

export const secondReducer=createReducer(
    {
        user:JSON.parse(localStorage.getItem("user")) || null,
        loading:false,
        error:null
    },

    {
        LoginStart:(state,action)=>{
            state.user="",
            state.loading=true,
            state.error=null
        },
        LoginFinish:(state,action)=>{
            // console.log('I love you ')
            console.log(action.payload)
            state.user=action.payload
            state.loading=false,
            state.error=null
        },
        LoginFailed:(state,action)=>{
            state.user="",
            state.loading=false,
            state.error=action.payload
        },
        RegisterStart:(state,action)=>{
            state.user="",
            state.loading=true,
            state.error=null
        },
        RegisterFinish:(state,action)=>{
            state.user=action.payload
            state.loading=false,
            state.error=null
        },
        RegisterFailed:(state,action)=>{
            state.user="",
            state.loading=false,
            state.error=action.payload
        },
        LogoutStart:(state,action)=>{
             state.user="",
            state.loading=true,
            state.error=null
        },
        LogoutFinish:(state,action)=>{
            state.user=""
            state.loading=false,
            state.error=null
        },
        LogoutFailed:(state,action)=>{
            // state.user="",
            state.loading=false,
            state.error=action.payload
        },
        UserUpdateStart:(state,action)=>{
            state.user="",
            state.loading=true,
            state.error=null
        },
        UserUpdateFailed:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        UserUpdateFinish:(state,action)=>{
            state.user=action.payload.user
            state.loading=false
            state.error=null
        }
        
    }

)
