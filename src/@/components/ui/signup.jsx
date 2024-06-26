import React, { useState } from "react";
import { z } from "zod";
import Cookies from "js-cookie";
import { restapiUserURL } from "../../../constants";
import { AiOutlineArrowLeft } from "react-icons/ai";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      loginSchema.parse({ email, password });

      const response = await fetch(`${restapiUserURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const json = await response.json();
      if (json.token) {
        Cookies.set("access_token", json.token, { secure: true });
        window.location.href = "/";
      } else {
        alert(json.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        alert("Unable to Signup. Please try again later.");
      }
    }
  };

  const handleBackClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <button
        onClick={handleBackClick}
        className="fixed top-5 left-5 p-3 bg-blue-600 text-white rounded-full shadow-md opacity-20 hover:opacity-100 z-50 flex items-center justify-center transition-opacity duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </button>
      <div className="lg:w-2/5 bg-white flex flex-col justify-center items-center p-5">
        <div className="w-full lg:w-1/2 max-w-md">
          <h2 className="mb-5 text-xl text-center font-bold">Register</h2>
          <form onSubmit={handleSignup} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="p-2 text-base w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="your password"
                className="p-2 text-base w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-5 mt-2 mb-5 bg-blue-500 text-white rounded font-bold text-base border-none cursor-pointer hover:bg-blue-600"
            >
              Signup
            </button>
          </form>
          <div className="text-center text-xs mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </div>
        </div>
      </div>
      <div className="lg:w-3/5 bg-blue-100 flex flex-col justify-center items-center p-5 text-center">
        <h1>IMG LIB</h1>
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">
            Image Library
            <span className="text-blue-700 font-extrabold">.</span>
          </h1>
          <p className="text-gray-700 text-sm md:text-base lg:text-base mb-5">
            Add Images or search with tags.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
