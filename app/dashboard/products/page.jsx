"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Adjust this path to your firebase config
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DataTable from '@/components/table/ProductTable'; // Adjust the path accordingly
import ConfirmationModal from '@/components/model/ConfirmationModal'; // Adjust the path accordingly
import { Toast, ToastProvider } from '@/lib/tostify';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Function to delete a product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      setIsModalOpen(false); // Close the modal after deletion
      Toast.warn("Product Deleted !", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting product: ", error);
      Toast.error("Something went wrong!", { autoClose: 1500 });
    }
  };

  // Function to open the modal
  const openModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null); // Clear the product
  };

  return (
    <div>
      <ToastProvider />
      <h1 className="text-2xl font-bold text-blue-500 pb-4">Products</h1>
      <DataTable data={products} onDelete={openModal} />
      {productToDelete && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => handleDelete(productToDelete.id)}
          productName={productToDelete.productName} // Assuming you have this field
        />
      )}
    </div>
  );
};

export default ProductsPage;
