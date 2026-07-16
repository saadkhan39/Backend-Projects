import { setUser,setError,setLoading ,setLogout} from "../redux/auth.slice";
import {register,login,getMe ,resendEmailVerification ,logout} from "../service/auth.api"
import {useDispatch} from "react-redux"

export function useAuth(){
      
    const dispatch = useDispatch()

    async function handleRegister({username,email,password}) {
        try {
            dispatch(setLoading(true))
           const data = await register({ username, email, password });
           return data;
           dispatch(setError(null))
        } catch (error) {
            dispatch(setError(error.response?.data?.message|| "Registration failed"))
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }

     async function handleLogin({email,password}) {
        try {
            dispatch(setLoading(true))
            const data = await login({email,password})
            if (data?.success) {
                dispatch(setUser(data.user ?? { email }))
                dispatch(setError(null))
            }
            return data
        } catch (error) {
            const message = error.response?.data?.message || "Login failed"
            dispatch(setError(message))
            return { success: false, message }
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            dispatch(setError(null))
        } catch (error) {
            dispatch(setError(error.response?.data?.message|| "Failed to fetched user data"))
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }

    async function handleLogout() {
    try {
        dispatch(setLoading(true));

        await logout();

        dispatch(logout());

        return {
            success: true,
        };
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message ||
                "Logout failed"
            )
        );

        return {
            success: false,
        };
    } finally {
        dispatch(setLoading(false));
    }
}

     async function handleResendEmailVerification(email) {
        try {
            dispatch(setLoading(true))
            const data = await resendEmailVerification(email)
            dispatch(setUser(data.user))
            dispatch(setError(null))
        } catch (error) {
            dispatch(setError(error.response?.data?.message|| "Failed to resend email"))
        }
        finally{
            dispatch(setLoading(false))
        }
        
    }

    return {handleRegister,handleLogin,handleGetMe,handleResendEmailVerification ,handleLogout}
}


