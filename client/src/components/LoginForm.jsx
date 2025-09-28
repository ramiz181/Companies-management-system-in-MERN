import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginForm() {


    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/api/adminLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {

                const result = await response.json();
                localStorage.setItem('token', result.token)

                setMessage(result.message)
                setMessageType("success")
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
            else {
                const errorResult = await response.json()

                setMessageType("error")
                setMessage(errorResult.message || "Invalid or missing credentials...")

                setTimeout(() => {
                    setMessage("");
                    setMessageType("");
                }, 3000);
            }
        } catch (error) {
            console.log("error in logging in", error.message);
        }
    }
    return (
        <>
            {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4"></div>
            <form className="flex flex-col gap-3 bg-white p-6 sm:p-8 w-full max-w-md rounded-2xl font-sans shadow-md"> </form> */}
            <div className="h-screen flex items-center">

                <form onSubmit={handleSubmit} className=" flex flex-col gap-3 bg-white p-8 w-[450px] rounded-2xl font-sans shadow">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-semibold">Email</label>
                    </div>
                    <div className="flex items-center h-12 border border-gray-200 rounded-lg pl-2 focus-within:border-blue-600 transition">
                        {/* Email icon */}
                        <svg
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                        >
                            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                        </svg>
                        <input
                            type="text"
                            className="ml-2 w-full h-full border-none rounded-lg focus:outline-none placeholder-gray-400"
                            placeholder="Enter your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-semibold">Password</label>
                    </div>
                    <div className="flex items-center h-12 border border-gray-200 rounded-lg pl-2 focus-within:border-blue-600 transition">
                        {/* Lock icon */}
                        <svg
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-64 0 512 512"
                        >
                            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                        </svg>
                        <input
                            type="password"
                            className="ml-2 w-full h-full border-none rounded-lg focus:outline-none placeholder-gray-400"
                            placeholder="Enter your Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <label>Remember me</label>
                        </div>
                        <span className="text-blue-600 font-medium cursor-pointer">
                            Forgot password?
                        </span>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="mt-5 mb-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg h-12 w-full cursor-pointer">
                        Sign In
                    </button>

                    {/* Signup link */}
                    {message && (
                        <div className={`flex justify-center items-center p-2 rounded-lg ${messageType === 'success' ? "text-green-600 bg-green-200 " : " text-red-600 bg-red-200 "
                            }`} >
                            <p className="text-center text-sm font-medium">
                                {message}
                            </p>
                        </div>
                    )}
                </form >
            </div >
        </>
    );
};