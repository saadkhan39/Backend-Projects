import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    const data = await handleRegister(payload);

    if (data?.success) {
      navigate("/login", {
        state: {
          message:
            "Registration successful! We've sent a verification link to your email. Please verify your account before logging in.",
          email: payload.email,
        },
      });
    }
    
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-[#181818] border border-gray-800 rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Register to continue
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500 p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            required
            minLength={3}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
            minLength={6}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
          <h3 className="text-white font-medium mb-2">
            Email Verification Required
          </h3>

          <p className="text-sm text-gray-300">
            After creating your account, we'll send a verification link to your
            email address. Click the link to activate your account before you
            can log in.
          </p>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;