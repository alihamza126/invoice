"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Page = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(); // Reference to the grid instance

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesCollection = collection(db, "invoices");
        const invoiceSnapshot = await getDocs(invoicesCollection);
        const invoiceList = invoiceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvoices(invoiceList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices: ", error);
      }
    };
    fetchInvoices();
  }, []);

  const columnDefs = useMemo(
    () => [
      { headerName: "Invoice Number", field: "invoiceNumber", sortable: true, filter: true },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Phone", field: "phone", sortable: true, filter: true },
      { headerName: "Delivery Type", field: "deliveryType", sortable: true, filter: true },
      { headerName: "Billing Address", field: "billingAddress", sortable: true, filter: true },
      { headerName: "Delivery Address", field: "deliveryAddress", sortable: true, filter: true },
      {
        headerName: "Download Invoice",
        field: "pdfUrl",
        sortable: true,
        filter: true,
        cellRenderer: (params) => (
          <a href={params.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Download PDF
          </a>
        ),
      },
      { headerName: "Apply Tax", field: "taxRate", sortable: true, filter: true },
      { headerName: "Tax $", field: "tax", sortable: true, filter: true },
      { headerName: "Sub total $", field: "subtotal", sortable: true, filter: true },
      { headerName: "Total dues $", field: "totaldues", sortable: true, filter: true },
      {
        headerName: "Items",
        field: "items",
        cellRenderer: (params) =>
          params.value.map((item, index) => (
            <div key={index} className="flex flex-col">
              {item.product} - {item.quantity} x {item.price}
            </div>
          )),
      },
    ],
    []
  );

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      filter: true,
    },
    pagination: true,
    paginationPageSize: 10,
  };

  // Export Functions
  const onExportCSV = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-500">All Sales</h1>

      {/* Export Buttons */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={onExportCSV}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Export CSV
        </button>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine w-full" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={invoices}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          domLayout="normal"
        />
      </div>
    </div>
  );
};

export default Page;
