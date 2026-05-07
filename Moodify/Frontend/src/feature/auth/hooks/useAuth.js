import { useContext, useEffect } from "react";
import { login, register, getMe, logout } from "../service/auth.api";
import { AuthDataContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthDataContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({username,email,password}) {

    try {

        setLoading(true)

        const data = await register({username,email,password})

        setUser(data.user)

    } catch (error) {

        console.log(error)

    } finally {

        setLoading(false)

    }
}

  async function handleLogin({email,password}) {

    try {

        setLoading(true)

        const data = await login({email,password})

        setUser(data.user)

    } catch (error) {

        console.log(error)

    } finally {

        setLoading(false)

    }
}

  async function handleGetMe() {
    try {
      setLoading(true);

      const data = await getMe();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {

    try {

        setLoading(true)

        await logout()

        setUser(null)

    } catch (error) {

        console.log(error)

    } finally {

        setLoading(false)

    }
}

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
}
