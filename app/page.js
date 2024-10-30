"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Toast, ToastProvider } from '@/lib/tostify';

import bg from '../public/inventry.webp';
import loginImage from '../public/signin-image.webp';
import Loader from '@/lib/loader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { isAuthenticated, user, isLoading, login, logout } = useAuth();

    useEffect(() => {
        isAuthenticated && router.push('/dashboard');
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            setLoading(false);
            console.log(isAuthenticated);
            isAuthenticated && router.push('/dashboard');
            isAuthenticated && Toast.success("You are login successfully!", { autoClose: 2000 });
        } catch (error) {

        }

        // try {
        //   // Replace with a test email and password
        //   setLoading(true);
        //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //   Toast.success("You are login successfully!", { autoClose: 2000 });
        //   setLoading(false);
        //   router.push('/dashboard');
        // } catch (error) {
        //   setLoading(false);
        //   Toast.error("Check your email and password", { autoClose: 2000 });
        // }

    };


    return (
        <div className="bg-white">
            <ToastProvider />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form onSubmit={handleLogin}>
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                            </div>

                            <div>
                                <label className="text-gray-800 text-xs block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        placeholder="Enter email"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                        {/* SVG content for the email icon */}
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="text-gray-800 text-xs block mb-2">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        placeholder="Enter password"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                        viewBox="0 0 128 128"
                                    >
                                        {/* SVG path for the eye icon */}
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-12">
                                <button disabled={loading ? true : false} type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    {loading ? <Loader /> : "Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
                        <Image src={loginImage} className="w-full h-full object-contain" alt="login-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
