
"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Toast, ToastProvider } from '@/lib/tostify';
import { TruckLoader } from '@/lib/TruckLoader';
import Loader from '@/lib/loader';

function page() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);    

    const companyDocRef = doc(db, 'companyInfo', 'mainCompanyInfo');

    // Fetch existing data from Firebase on page load
    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const docSnap = await getDoc(companyDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setValue('companyName', data.companyName);
                    setValue('email', data.email);
                    setValue('phone', data.phone);
                    setValue('address', data.address);
                    setValue('policy', data.policy);
                }
            } catch (error) {
                console.error('Error fetching company information:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanyInfo();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            setUpdating(true);
            await setDoc(companyDocRef, data, { merge: true });
            Toast.success("information updated successfully", { autoClose: 2000 });
        } catch (error) {
            Toast.error("Error updating", { autoClose: 2000 });
        }
        setUpdating(false);
    };

    if (loading) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <TruckLoader/>
        </div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastProvider />
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg  w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Company Information</h2>

                {/* Company Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="companyName">Company Name</label>
                    <input
                        id="companyName"
                        type="text"
                        {...register('companyName', { required: 'Company Name is required' })}
                        className={`w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } })}
                        className={`w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        {...register('phone', { required: 'Phone number is required', pattern: { value: /^\d+$/, message: 'Enter a valid phone number' } })}
                        className={`w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                        className={`w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                {/* Policy */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="policy">Policy</label>
                    <textarea
                        id="policy"
                        {...register('policy', { required: 'Policy is required' })}
                        className={`w-full px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 ${errors.policy ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.policy && <p className="text-red-500 text-sm mt-1">{errors.policy.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    {updating ? <Loader/> : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default page;
