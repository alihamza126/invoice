"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhotoFilm } from "react-icons/fa6";
import { db, storage } from '@/lib/firebase'; // Import Firestore and Storage instances
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toast, ToastProvider } from '@/lib/tostify';
import Loader from '@/lib/loader';

const Page = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = null;

      if (imageFile) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `images/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Add product data to Firestore
      await addDoc(collection(db, "products"), {
        productName: data.productName,
        productQuantity: data.productQuantity,
        productColor: data.productColor,
        salePrice: data.salePrice,
        imageUrl: imageUrl, // Save image URL to Firestore
      });

      Toast.success("Product added successfully", { autoClose: 2000 });

      // Reset form and clear image preview
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
      Toast.error("Product Added Failed", { autoClose: 2000 });
    }
    setLoading(false);
  };

  // Handle image preview and file storage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file); // Store the selected image file for Firebase upload
    }
  };

  return (
    <div className='px-20 py-5'>
      <ToastProvider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-4">
            <h2 className="font-bold text-blue-500 text-2xl">Add Products</h2>
          </div>

          <div className="border-gray-900/10">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Product name field */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Product name</label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                    type="text" placeholder="Product name" {...register("productName", { required: true })} />
                </div>
              </div>

              {/* Other input fields */}
              {/* Product Quantity */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Product Quantity</label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                    type="number" placeholder="Product Quantity" {...register("productQuantity", {})}
                  />
                </div>
              </div>
              {/* Product Color */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Product Color</label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                    type="text" placeholder="Product Color" {...register("productColor", {})} />
                </div>
              </div>
              {/* Sale Price */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Sale Price</label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                    type="number" placeholder="Sale Price" {...register("salePrice", {})} />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-span-full">
            <label className="block text-sm/6 font-medium text-gray-900">Cover photo</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Selected" className="mt-4 w-full max-w-xs h-auto object-cover" />
                ) : (
                  <FaPhotoFilm aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                )}
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus:ring-2 focus:ring-indigo-600"
                  >
                    <span className="mx-1 border py-1 px-2 rounded shadow">Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            {loading ? <Loader /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
