import {configureStore} from "@reduxjs/toolkit"
import { firstReducer, secondReducer } from "./reducer.jsx"

const store=configureStore({
    reducer:{
        first:firstReducer,
        second:secondReducer,
        // third:thirdReducer,
    },
})

store.subscribe(() => {
    const updatedUser = store.getState().second.user;
    localStorage.setItem("user", JSON.stringify(updatedUser));
});

export default store