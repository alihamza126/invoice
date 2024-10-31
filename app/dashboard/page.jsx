"use client"

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const page = () => {
    const [product, setProduct] = useState({ image: '', name: '', color: '', quantity: '', price: '' });
    const [customer, setCustomer] = useState({ name: '', address: '', phone: '', email: '' });
    const [taxRate, setTaxRate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'orders'), { product});
            alert('Order submitted!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Product Entry Fields */}
            <input type="text" placeholder="Product Image" onChange={(e) => setProduct({ ...product, image: e.target.value })} />
            <input type="text" placeholder="Product Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <input type="text" placeholder="Color" onChange={(e) => setProduct({ ...product, color: e.target.value })} />
            <input type="number" placeholder="Quantity" onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
            <input type="number" placeholder="Sales Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />

            <button type="submit">Submit Order</button>
        </form>
    );
};

export default page;
