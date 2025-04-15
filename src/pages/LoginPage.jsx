/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Successful login
      setMessage({ type: "success", text: "Login successful!" });

      // Redirect to dashboard after successful login
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF2] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#CCC5B9]">
          <div className="bg-[#252422] text-white p-6 text-center">
            <div className="flex justify-center mb-3">
              <svg
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#EB5E28"
                  strokeWidth="2"
                />
                <path
                  d="M8 12L11 15L16 9"
                  stroke="#EB5E28"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">
              Task<span className="text-[#EB5E28]">Master</span>
            </h1>
            <p className="text-[#CCC5B9] mt-1">Sign in to manage your tasks</p>
          </div>

          <form onSubmit={handleLogin} className="p-6">
            {message.text && (
              <div
                className={`mb-4 p-3 rounded-md flex items-center ${
                  message.type === "error"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle className="w-5 h-5 mr-2" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#403D39] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#403D39] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#403D39]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#403D39]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EB5E28] hover:bg-[#d55523] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-[#403D39]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#EB5E28] hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
