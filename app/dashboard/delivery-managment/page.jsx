"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FcInTransit } from "react-icons/fc";
import Loader from "@/lib/loader";

export default function DeliveryOrderManagement() {
    const { register, handleSubmit, reset, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState("shipped");
    const [invoicePreview, setInvoicePreview] = useState(null);
    const [isPdf, setIsPdf] = useState(false); // Track if the file is PDF

    const invoiceFile = watch("invoiceFile");

    const onSubmit = async (data) => {
        setLoading(true);
        const docId = uuidv4();

        try {
            let invoiceURL = "";

            if (data.invoiceFile && data.invoiceFile[0]) {
                const invoiceRef = ref(storage, `shippingInvoices/${docId}-${data.invoiceFile[0].name}`);
                await uploadBytes(invoiceRef, data.invoiceFile[0]);
                invoiceURL = await getDownloadURL(invoiceRef);
            }

            const deliveryData = {
                trackingNumber: data.trackingNumber,
                deliveryStatus: deliveryStatus,
                shippingFee: data.shippingFee,
                invoiceURL: invoiceURL || null,
            };
            await setDoc(doc(db, "deliveryOrders", docId), deliveryData);

            alert("Delivery details saved successfully!");
            reset();
            setInvoicePreview(null);
        } catch (error) {
            console.error("Error saving delivery details:", error);
            alert("Failed to save delivery details.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                setIsPdf(true);
                setInvoicePreview(URL.createObjectURL(file)); // Set preview for PDF
            } else if (file.type.startsWith("image/")) {
                setIsPdf(false);
                const reader = new FileReader();
                reader.onload = () => setInvoicePreview(reader.result); // Set preview for images
                reader.readAsDataURL(file);
            } else {
                setInvoicePreview(null);
            }
        }
    };

    return (
        <div className="w-xl px-16 mx-auto p-6 bg-white shadow-2xl rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-between gap-2 flex-nowrap py-5 text-blue-500">
                <p className="flex gap-2">Delivery Order Management <FcInTransit size={33} /></p>
                <span>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 px-2 text-sm text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-offset-2 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? <Loader/> : "Save Details"}
                    </button>
                </span>
            </h2>
                {/* Tracking Number */}
                <div>
                    <label className="block font-semibold text-gray-700">Tracking Number</label>
                    <input
                        type="text"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        {...register("trackingNumber", { required: true })}
                        placeholder="Enter tracking number"
                    />
                </div>

                {/* Delivery Status */}
                <div>
                    <label className="block font-semibold text-gray-700">Delivery Status</label>
                    <select
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        value={deliveryStatus}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                    >
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>

                {/* Shipping Fee */}
                <div>
                    <label className="block font-semibold text-gray-700">Shipping Fee</label>
                    <input
                        type="number"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        {...register("shippingFee", { required: true, min: 0 })}
                        placeholder="Enter shipping fee"
                    />
                </div>

                {/* Shipping Invoice */}
                <div>
                    <label className="block font-semibold text-gray-700">Upload Shipping Invoice</label>
                    <input
                        type="file"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        {...register("invoiceFile")}
                        accept="application/pdf,image/*"
                        onChange={handleFileChange}
                    />
                    {invoicePreview && (
                        <div className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                            <p className="text-gray-500 mb-2">Invoice Preview:</p>
                            {isPdf ? (
                                <embed src={invoicePreview} type="application/pdf" width="100%" height="400px" className="rounded-md" />
                            ) : (
                                <img src={invoicePreview} alt="Invoice Preview" className="max-w-full h-48 object-cover rounded-md" />
                            )}
                        </div>
                    )}
                </div>

                {/* Submit Button */}

            </form>
        </div>
    );
}
