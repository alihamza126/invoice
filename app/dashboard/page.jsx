"use client"
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalDeliverd, settotalDeliverd] = useState(0);
    const [totalShipped, settotalShipped] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch total invoices
                const invoicesSnapshot = await getDocs(collection(db, "invoices"));
                setTotalInvoices(invoicesSnapshot.size);

                // Fetch total products
                const productsSnapshot = await getDocs(collection(db, "products"));
                setTotalProducts(productsSnapshot.size);

                // Fetch delivered invoices
                const shippedQuery = query(collection(db, "invoices"), where("deliveryStatus", "==", "delivered"));
                const shippedSnapshot = await getDocs(shippedQuery);
                settotalDeliverd(shippedSnapshot.size);

                // Fetch shipped invoices
                const deliveredQuery = query(collection(db, "invoices"), where("deliveryStatus", "==", "shipped"));
                const delivereSnapshot = await getDocs(deliveredQuery);
                settotalShipped(delivereSnapshot.size);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to the Invoice App!</h2>
                <p className="text-gray-600">
                    Here you can manage your orders, track deliveries, and generate invoices with ease.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
                    <p className="text-2xl font-bold text-blue-600">{totalInvoices}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                    <p className="text-2xl font-bold text-yellow-600">{totalProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800">Completed Deliveries</h3>
                    <p className="text-2xl font-bold text-green-600">{totalDeliverd}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800">Total Shipped</h3>
                    <p className="text-2xl font-bold text-red-600">{totalShipped}</p>
                </div>
            </div>

            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Link href="/dashboard/invoices/generate" className="bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition duration-200 flex-1">
                        Genrate New Order
                    </Link>
                    <Link href="/dashboard/invoices" className="bg-green-500 text-white text-center py-2 rounded hover:bg-green-600 transition duration-200 flex-1">
                        All Sales
                    </Link>
                    <Link href="/dashboard/delivery-managment" className="bg-yellow-500 text-white text-center py-2 rounded hover:bg-yellow-600 transition duration-200 flex-1">
                        Delivery Managment
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
