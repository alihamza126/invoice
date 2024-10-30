import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { FcPaid } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { FcDataRecovery } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";

import { FcRules } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { useAuth } from '@/context/AuthContext';
import userImg from '../../public/user.png'
import { IoMdLogOut } from "react-icons/io";



const Sidebar = () => {
    const { isAuthenticated, user, isLoading, login, logout } = useAuth();

    return (
        <div className=" sticky top-0 rounded-md shadow bg-white flex-1 flex h-screen flex-col justify-between border-e">
            <div className="px-2 ">
                <span className="flex justify-evenly  items-center h-10 w-auto mt-4 place-content-center rounded-lg text-xs text-gray-600">
                    <p className=' text-2xl font-bold text-blue-500'> Invoce</p>
                    <Image
                        src={logo}
                        height={30}
                        width={30}
                        alt="conct whtspp"
                        rel='+923037828419'
                    />
                </span>

                <ul className="mt-8 space-y-2">
                    <li>
                        <Link
                            href="/dashboard"
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium flex gap-2 justify-center items-center"> <FcPaid size={23} /> Products</span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        href="/dashboard/products/add"
                                        className="blo gap-2 flex justify-center items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <FcDataRecovery size={19} />

                                        Add New
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/dashboard/products"
                                        className=" gap-2 flex justify-center items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <FcTodoList size={19} />
                                        View All
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>


                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium flex justify-evenly items-center gap-2 "> <FcRules size={23} /> Invoices </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        href="/dashboard/invoices/generate"
                                        className="gap-2 flex justify-center items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <FcSynchronize size={19} />
                                        New Invoice
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/dashboard/invoices"
                                        className="gap-2 flex justify-center items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <FcTodoList size={19} />
                                        All Invoices
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/report"
                            className="flex justify-start gap-2 items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <FcBarChart size={23} />
                            Report
                        </Link>
                    </li>

                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <div  className="flex flex-col items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <Image
                        alt=""
                        src={userImg}
                        className="size-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs bg-blue-100 py-1 px-1 text-blue-700">
                            <span>{user?.email&&user?.email}</span>
                        </p>
                    </div>
                    <div className='mt-1'>
                        <button
                            onClick={logout}
                            className=" bg-blue-400 flex gap-2 justify-center items-center text-white px-3 py-1 rounded hover:bg-blue-500"
                        >
                            Logout <IoMdLogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar