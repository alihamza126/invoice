"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const page = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesCollection = collection(db, 'invoices');
        const invoiceSnapshot = await getDocs(invoicesCollection);
        const invoiceList = invoiceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setInvoices(invoiceList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices: ", error);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div>
      <h1>Invoices</h1>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Billing Address</th>
            <th>Delivery Address</th>
            <th>Tax Rate</th>
            <th>Total Tax Rate</th>
            <th>Delivery Type</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.billingAddress}</td>
              <td>{invoice.deliveryAddress}</td>
              <td>{invoice.taxRate}</td>
              <td>{invoice.totalTaxRate}</td>
              <td>{invoice.deliveryType}</td>
              <td>
                <ul>
                  {invoice.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x {item.price}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page