import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/redux/auth.slice"
import chatReducer from "../features/chat/redux/chat.slice"

export const store = configureStore({
        reducer:{
            auth:authReducer,
            chat:chatReducer
        }
})