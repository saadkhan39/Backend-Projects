import { useState } from "react";
import { Link, useNavigate ,useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   const {handleLogin} = useAuth()
    
    const navigate = useNavigate()
    const location = useLocation();

const message = location.state?.message;
const email = location.state?.email;

  const submitHandler = async(e) => {
    e.preventDefault();

    console.log(formData);
    
    const result = await handleLogin(formData)
    if (result?.success) {
      navigate("/")
    }
  };

  return (
    
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
    
      <div className="w-full max-w-md bg-[#1a1a1a]  rounded-xl p-8">

        <h1 className="text-3xl font-semibold text-white text-center">
          Login
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Welcome back
        </p>

        <form onSubmit={submitHandler} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
className="w-full bg-[#2a2a2a]  rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-400 focus:bg-[#303030] transition-colors"          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
className="w-full bg-[#2a2a2a]  rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-400 focus:bg-[#303030] transition-colors"          />

          <button className="w-full bg-gray-200 text-black py-3 rounded-lg font-medium hover:bg-white transition">
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
        {message && (
  <div className="mb-4 rounded-lg border border-green-600 bg-green-900/20 p-4">
    <p className="text-green-400">{message}</p>

    {email && (
      <p className="mt-2 text-sm text-gray-400">
        Verification email sent to <strong>{email}</strong>
      </p>
    )}
  </div>
)}
    </div>
  );
};

export default Login;