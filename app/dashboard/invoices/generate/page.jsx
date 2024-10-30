"use client";

import { Comboboxproducts } from "@/components/common/ComboBox";
import { useForm } from "react-hook-form";
import { FcRules } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Toast, ToastProvider } from "@/lib/tostify";
import { Comboboxtax } from "@/components/common/ComboBoxTax";
import { Button } from "@/components/ui/button"
import { BsBuildingGear } from "react-icons/bs";
import PdfClient from "@/components/common/PdfClient";
import { FcUpLeft } from "react-icons/fc";
import { useRouter } from "next/navigation";




const provinces = [
  { code: "AB", name: "Alberta", taxRate: "5% GST", totalTaxRate: 5 },
  { code: "BC", name: "British Columbia", taxRate: "5% GST + 7% PST", totalTaxRate: 12 },
  { code: "MB", name: "Manitoba", taxRate: "5% GST + 7% PST", totalTaxRate: 12 },
  { code: "NB", name: "New Brunswick", taxRate: "15% HST", totalTaxRate: 15 },
  { code: "NL", name: "Newfoundland and Labrador", taxRate: "15% HST", totalTaxRate: 15 },
  { code: "NT", name: "Northwest Territories", taxRate: "5% GST", totalTaxRate: 5 },
  { code: "NS", name: "Nova Scotia", taxRate: "15% HST", totalTaxRate: 15 },
  { code: "NU", name: "Nunavut", taxRate: "5% GST", totalTaxRate: 5 },
  { code: "ON", name: "Ontario", taxRate: "13% HST", totalTaxRate: 13 },
  { code: "PE", name: "Prince Edward Island", taxRate: "15% HST", totalTaxRate: 15 },
  { code: "QC", name: "Quebec", taxRate: "5% GST + 9.975% QST", totalTaxRate: 14.975 },
  { code: "SK", name: "Saskatchewan", taxRate: "5% GST + 6% PST", totalTaxRate: 11 },
  { code: "YT", name: "Yukon", taxRate: "5% GST", totalTaxRate: 5 },
];

const Page = () => {
  const router = new useRouter()


  const [allData, setAllData] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ product: "", quantity: 1, price: 0 }]);
  const [sameAddress, setSameAddress] = useState(false);
  const [selectedTaxRate, setSelectedTaxRate] = useState(""); // State for tax rate
  const [totalTaxRate, setTotalTaxRate] = useState(0); // State for total tax rate
  const [companyInfo, setCompanyInfo] = useState({});


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const companyDocRef = doc(db, 'companyInfo', 'mainCompanyInfo');
        try {
          const docSnap = await getDoc(companyDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCompanyInfo(data);
          }
        } catch (error) {
          console.error("Error fetching company information:", error);
        }

        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
        // console.log(productList)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const onSubmit = data => {
    if (sameAddress) {
      data.deliveryAddress = data.billingAddress;
    }
    data.taxRate = selectedTaxRate; // Include the selected tax rate in the form data
    data.totalTaxRate = totalTaxRate; // Include the selected total tax rate in the form data
    setAllData([data, items]);
    Toast.success("Invoice generated successfully", { autoClose: 2000 });
  };

  const PreviewPdf = () => {
    const onSubmit = data => {
      if (sameAddress) {
        data.deliveryAddress = data.billingAddress;
      }
      data.taxRate = selectedTaxRate; // Include the selected tax rate in the form data
      data.totalTaxRate = totalTaxRate; // Include the selected total tax rate in the form data
      setAllData([data, items]);
    };
  }

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value, price = null) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? { ...item, [field]: value, ...(price !== null && { price }) }
        : item
    );
    setItems(updatedItems);
  };


  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    Toast.warn("Item removed", { autoClose: 500 });
  };

  function generateInvoiceNumber(isFinalInvoice = false) {
    const lastInvoiceOrder=0;
    if (isFinalInvoice) {
      currentDraftVersion = 1;
    } else {
      currentDraftVersion++; 
    }
    const invoiceNumber = `#${String(lastInvoiceOrder).padStart(3, '0')}-${currentDraftVersion}`;
    return invoiceNumber;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastProvider />
      <div className="flex gap-2 p-2 min-h-screen">
        <div className="w-[55%] bg-slate-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-blue-500 mb-4 flex flex-nowrap items-center gap-2">
            Invoice details <FcRules size={23} />
          </h2>
          <p className="text-sm text-gray-600 mb-4">Enter Customer Information:</p>

          {/* Name and email */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                type="email"
                placeholder="email"
                {...register("email")}
              />
            </div>
          </div>

          {/* Address and Phone Number */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                type="tel"
                placeholder="phone"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500">Billing Address</label>
            <textarea
              required
              placeholder="Billing Address"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              {...register("billingAddress")}
            />
          </div>

          {/* Checkbox for same address */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAddress"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
            />
            <label htmlFor="sameAddress" className="text-sm font-medium text-gray-500">
              Delivery address is the same as billing address
            </label>
          </div>

          {/* Delivery Address */}
          {!sameAddress && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-500">Delivery Address</label>
              <textarea
                required
                placeholder="Delivery Address"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                {...register("deliveryAddress")}
              />
            </div>
          )}

          {/* Tax Rate Selection using Combobox */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500">Tax State</label>
            <Comboboxtax
              products={provinces.map(province => ({
                label: `${province.name} (${province.code}): ${province.taxRate}`,
                value: `${province.code}: ${province.taxRate}`
              }))}
              value={selectedTaxRate}
              onChange={(value) => {
                setSelectedTaxRate(value);
                const selectedProvince = provinces.find(province => value.startsWith(province.code));
                if (selectedProvince) {
                  setTotalTaxRate(selectedProvince.totalTaxRate); // Update total tax rate
                }
              }}
            />
            <p className=" text-xs text-gray-400 p-1">search with short name (New Brunswick : NB)</p>
          </div>

          <hr className="py-2" />
          {/* Items Section */}
          <div>
            <h3 className="text-xl text-blue-500 font-semibold my-4">Products</h3>
            {/* Header */}
            <header className="grid grid-cols-5 gap-2 mt-2 text-sm text-gray-600">
              <div className="col-span-3 w-full rounded-lg ps-2">Select Product</div>
              <div className="col-span-1 w-full rounded-lg">Quantity</div>
              <div className="col-span-1 w-full rounded-lg"></div>
            </header>

            {/* Product Selection for Each Item */}
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 mt-2 items-center">
                <div className="col-span-3 w-full rounded-lg">
                  <Comboboxproducts
                    products={products}
                    value={item.product}
                    onChange={(product, price) => updateItem(index, "product", product, price)}
                  />

                </div>
                <input
                  type="number"
                  className="border col-span-1 border-gray-300 rounded-lg px-3 p-1"
                  placeholder="QTY"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className="text-red-500 col-span-1 flex justify-center items-center rounded-lg"
                >
                  <span className="hover:bg-gray-200 hover:animate-pulse rounded-full p-2">
                    <FaTrash size={14} />
                  </span>
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="bg-gray-200 p-2 py-1 rounded shadow text-sm text-blue-500 mt-2">
              + Add Item
            </button>
          </div>
        </div>

        {/* Invoice Preview Section */}
        {/* ... (Remaining code for Invoice Preview section) */}
        <div className="w-[45%] bg-white p-6 rounded-lg shadow border h-screen sticky top-6">
          <h2 className="text-xl font-semibold mb-4 flex justify-between">Preview
            <Button
              title="Genrate new invoice"
              onClick={() => window.location.reload()}
            >
              New Invoice <FcUpLeft size={15} />
            </Button>
          </h2>

          <div className="p-4">
            <PdfClient allData={allData} companyInfo={companyInfo} />
          </div>
        </div>

      </div>
      <div className="p-2 w-1/2 flex gap-6 justify-end mt-5">
        <Button
          className=" bg-blue-600 text-white font-semibold rounded-lg py-4 px-4 shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Genrate Invoice <BsBuildingGear size={15} />
        </Button>
      </div>
    </form>
  );
};

export default Page;
