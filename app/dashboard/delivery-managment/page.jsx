"use client";
import React, { useEffect, useState } from 'react';
import { db, storage } from "@/lib/firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { useTable } from 'react-table';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import { Toast, ToastProvider } from '@/lib/tostify';

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [invoicePreview, setInvoicePreview] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "invoices"), where("deliveryType", "==", "delivery"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const deliveryOrders = [];
            querySnapshot.forEach((doc) => {
                deliveryOrders.push({ id: doc.id, ...doc.data() });
            });
            setOrders(deliveryOrders);
        });

        return () => unsubscribe();
    }, []);

    const columns = React.useMemo(() => [
        { Header: "Order Invoice", accessor: "invoiceNumber" },
        { Header: "Name", accessor: "name" },
        { Header: "Phone", accessor: "phone" },
        { Header: "Delivery Type", accessor: "deliveryType" },
        { Header: "Tracking id", accessor: "trackingNumber" },
        { Header: "Delivery-Status", accessor: "deliveryStatus" },
        {
            Header: "Delivery Fee",
            accessor: "shippingFee",
            Cell: ({ value }) => `${value ? "$" + value : ''}`, // Format the shipping fee with a dollar sign
        },
        {
            Header: "Invoice",
            accessor: "invoiceURL",
            Cell: ({ value }) => (
                <a href={value} target="_blank" rel="noopener noreferrer" className="bg-blue-300 rounded text-white p-1 px-2 cursor-pointer">
                    View
                </a>
            ),
        },
        {
            Header: "Actions",
            Cell: ({ row }) => (
                <button
                    onClick={() => handleEdit(row.original)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>
            ),
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: orders });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleEdit = (order) => {
        setCurrentOrder(order);
        setInvoiceFile(null);
        setInvoicePreview(null);
        setModalIsOpen(true);
        // Set initial values in the form
        setValue("trackingNumber", order.trackingNumber);
        setValue("deliveryStatus", order.deliveryStatus);
        setValue("shippingFee", order.shippingFee);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        setCurrentOrder(null);
        setInvoiceFile(null);
        setInvoicePreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInvoiceFile(file);
            setInvoicePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (data) => {
        if (!currentOrder) return;
        setLoading(true);
        const orderRef = doc(db, "invoices", currentOrder.id);

        try {
            const updatedData = {
                ...data, // Spread form data
            };

            if (invoiceFile) {
                const invoiceRef = ref(storage, `shippingInvoices/${currentOrder.id}-${invoiceFile.name}`);
                await uploadBytes(invoiceRef, invoiceFile);
                updatedData.invoiceURL = await getDownloadURL(invoiceRef);
            }

            await updateDoc(orderRef, updatedData);
            Toast.success("Order updated successfully!", { close: 2000 });
            handleModalClose();
        } catch (error) {
            Toast.error("Order Updation failed!", { close: 2000 });
            alert("Failed to update order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto px-1 py-5 rounded overflow-hidden">
            <ToastProvider />
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Delivery Invoices</h1>
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white border border-gray-200 shadow overflow-hidden rounded-lg">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-500 text-white">
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="border-b text-nowrap border-gray-100 px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="border-b border-gray-300 px-4 py-2 text-gray-700 text-sm"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/3 p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Order</h2>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="mb-4">
                                <label className="block font-semibold">Tracking Number</label>
                                <input
                                    type="text"
                                    {...register("trackingNumber", { required: "Tracking number is required" })}
                                    className={`mt-1 p-2 w-full border ${errors.trackingNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                                />
                                {errors.trackingNumber && <p className="text-red-500 text-sm">{errors.trackingNumber.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold">Delivery Status</label>
                                <select
                                    {...register("deliveryStatus", { required: "Delivery status is required" })}
                                    className={`mt-1 p-2 w-full border ${errors.deliveryStatus ? 'border-red-500' : 'border-gray-300'} rounded`}
                                >
                                    <option value="">Select Status</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                {errors.deliveryStatus && <p className="text-red-500 text-sm">{errors.deliveryStatus.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold">Delivery Fee</label>
                                <input
                                    type="number"
                                    min={0}
                                    {...register("shippingFee", { required: "Shipping fee is required", valueAsNumber: true })}
                                    className={`mt-1 p-2 w-full border ${errors.shippingFee ? 'border-red-500' : 'border-gray-300'} rounded`}
                                />
                                {errors.shippingFee && <p className="text-red-500 text-sm">{errors.shippingFee.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold">Upload Invoice</label>
                                <input
                                    type="file"
                                    accept="application/pdf,image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                                />
                                {invoicePreview && (
                                    <div className="mt-3">
                                        <p className="text-gray-500 mb-2">Invoice Preview:</p>
                                        {invoiceFile.type === "application/pdf" ? (
                                            <embed src={invoicePreview} type="application/pdf" width="100%" height="200px" className="rounded-md" />
                                        ) : (
                                            <img src={invoicePreview} alt="Invoice Preview" className="max-w-full h-48 object-cover rounded-md" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
