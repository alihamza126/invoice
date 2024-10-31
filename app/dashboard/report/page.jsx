"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase"; // Adjust the import according to your Firebase setup
import { collection, getDocs } from "firebase/firestore";

const page = () => {
  const [salesData, setSalesData] = useState([]);
  const [taxedSalesProfit, setTaxedSalesProfit] = useState(0);
  const [noTaxSalesProfit, setNoTaxSalesProfit] = useState(0);

  // Fetch sales data from Firebase
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "invoices")); // Adjust collection name as necessary
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  // Calculate profits based on sales data
  const calculateProfits = () => {
    let taxedProfit = 0;
    let noTaxProfit = 0;

    salesData.forEach(sale => {
      const { subtotal, shippingFee, taxed } = sale;

      if (subtotal && shippingFee) { // Ensure salePrice and deliveryFee are defined
        const profit = subtotal - shippingFee;

        if (taxed) {
          taxedProfit += profit;
        } else {
          noTaxProfit += profit;
        }
      }
    });

    setTaxedSalesProfit(taxedProfit);
    setNoTaxSalesProfit(noTaxProfit);
  };

  // Calculate profits whenever salesData changes
  useEffect(() => {
    if (salesData.length > 0) {
      console.log('now is the time');
      console.log(salesData);
      calculateProfits();
    }
  }, [salesData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Sales Report</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-7">Profit Overview</h2>
        <div className="flex justify-between">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-600">Taxed Sales Profit</h3>
            <p className="text-2xl text-gray-600 font-bold">${taxedSalesProfit.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600">No-Tax Sales Profit</h3>
            <p className="text-2xl font-bold text-gray-600">${noTaxSalesProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {salesData.length === 0 && (
        <div className="mt-4 text-gray-500">No sales data available.</div>
      )}
    </div>
  );
};

export default page;
