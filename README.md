 {modalIsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/3 p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Order</h2>
                        {currentOrder && (
                            <div>
                                <div className="mb-4">
                                    <label className="block font-semibold">Tracking Number</label>
                                    <input
                                        type="text"
                                        value={currentOrder.trackingNumber}
                                        onChange={(e) => setCurrentOrder({ ...currentOrder, trackingNumber: e.target.value })}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">Delivery Status</label>
                                    <select
                                        value={currentOrder.deliveryStatus}
                                        onChange={(e) => setCurrentOrder({ ...currentOrder, deliveryStatus: e.target.value })}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                                    >
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">Shipping Fee</label>
                                    <input
                                        type="number"
                                        value={currentOrder.shippingFee}
                                        onChange={(e) => setCurrentOrder({ ...currentOrder, shippingFee: e.target.value })}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                                    />
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
                                        onClick={handleUpdate}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : "Update Order"}
                                    </button>
                                    <button
                                        onClick={handleModalClose}
                                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}