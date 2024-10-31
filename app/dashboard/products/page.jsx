"use client"

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import DataTable from '@/components/table/ProductTable';
import ConfirmationModal from '@/components/model/ConfirmationModal';
import EditProductModal from '@/components/common/EditProductModel';
import { Toast, ToastProvider } from '@/lib/tostify';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

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
      setIsModalOpen(false);
      Toast.warn("Product Deleted!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting product:", error);
      Toast.error("Something went wrong!", { autoClose: 1500 });
    }
  };

  // Function to update a product
  const handleUpdate = async (updatedProduct) => {
    try {
      const productRef = doc(db, 'products', updatedProduct.id);
      await updateDoc(productRef, updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsEditModalOpen(false);
      Toast.success("Product Updated!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error updating product:", error);
      Toast.error("Failed to update product.", { autoClose: 1500 });
    }
  };

  // Open the delete confirmation modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  // Open the edit modal
  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <ToastProvider />
      <h1 className="text-2xl font-bold text-blue-500 pb-4">Products</h1>
      <DataTable data={products} onDelete={openDeleteModal} onEdit={openEditModal} />
      {productToDelete && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(productToDelete.id)}
          productName={productToDelete.productName}
        />
      )}
      {productToEdit && (
        <EditProductModal
          isOpen={isEditModalOpen}
          product={productToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductsPage;
