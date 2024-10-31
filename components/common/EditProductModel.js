import React, { useState, useEffect } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { set } from 'react-hook-form';
import Loader from '@/lib/loader';

const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...product });
  const [newImageFile, setNewImageFile] = useState(null); // Track new image file
  const [imagePreview, setImagePreview] = useState(formData.imageUrl || ''); // Preview for new image
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);

    // Generate a preview URL for the new file
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSave = async () => {
    let updatedProduct = { ...formData };
    setLoading(true);

    // If there's a new image file, upload it and update the image URL
    if (newImageFile) {
      const imageRef = ref(storage, `images/${newImageFile.name}`);
      await uploadBytes(imageRef, newImageFile);
      const imageUrl = await getDownloadURL(imageRef);
      updatedProduct = { ...updatedProduct, imageUrl }; // Update with new URL
    }

    onSave(updatedProduct); // Pass updated product data back to parent component
    setNewImageFile(null); // Reset file input
    setImagePreview(''); // Clear the preview
    setLoading(false);
  };

  useEffect(() => {
    // Clean up preview URL when the component unmounts or a new file is selected
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  return (
    <div className="fixed h-full overflow-y-auto py-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg mt-10 shadow-lg p-6 pt-10 w-full max-w-md mx-auto space-y-2">
        <h2 className="text-2xl font-semibold text-gray-700">Edit Product</h2>

        <div>
          <span className='text-gray-500'>Product Name</span>
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-md px-4 text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
        <span className='text-gray-500'>Product Quantity</span>
          <input
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            placeholder="Quantity"
            type="number"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
        <span className='text-gray-500'>Product Color</span>
          <input
            name="productColor"
            value={formData.productColor}
            onChange={handleChange}
            placeholder="Color"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
        <span className='text-gray-500'>Product Price</span>
          <input
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="Sale Price"
            type="number"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Image Upload Input */}
        <label className="block text-gray-600 font-medium">
          Update Image
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <label className="block text-gray-600 font-medium mb-2">Image Preview:</label>
            <img src={imagePreview} alt="Image Preview" className=" max-h-[200px] w-full rounded-md" />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
             {loading ?<Loader/>:'Save'} 
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
