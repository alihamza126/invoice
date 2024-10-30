 <div className="w-[45%] bg-white p-6 rounded-lg shadow border h-screen sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-2xl font-semibold mb-4">Invoice</h3>
            <p className="text-sm font-medium text-gray-500">Invoice Number</p>
            <p className="mb-4 font-medium">UXERFLOW-INV001</p>

            {/* Billed to */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Billed to</h4>
                <p className="font-medium">Acme Enterprise</p>
                <p className="text-sm text-gray-500">acme@enterprise.com</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Due date</h4>
                <p className="font-medium">27 August 2024</p>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="font-medium">1901 Thornridge Cir. Shiloh, Hawaii, USA. 81063</p>
            </div>

            {/* Items Table */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="grid grid-cols-4 gap-2 mb-2 text-gray-500">
                <span>Items</span>
                <span>QTY</span>
                <span>Rate</span>
                <span>Total</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2 font-medium">
                <span>Web Design</span>
                <span>2</span>
                <span>$0</span>
                <span>$0</span>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <p className="text-sm text-gray-500">Subtotal</p>
                <p className="text-right">$0</p>
                <p className="text-sm text-gray-500">Discount</p>
                <p className="text-right">$0</p>
                <p className="text-sm text-gray-500">Tax</p>
                <p className="text-right">$0</p>
                <p className="text-lg font-semibold text-gray-800">Total</p>
                <p className="text-lg font-semibold text-right">$0</p>
              </div>
            </div>
          </div>
        </div>









        {/* <div className="grid grid-cols-2 items-center">
                <div>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                        alt="company-logo"
                        height="100"
                        width="100"
                    />
                </div>

                <div className="text-right">
                    <p>Tailwind Inc.</p>
                    <p className="text-gray-500 text-sm">sales@tailwindcss.com</p>
                    <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
                    <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
                </div>
            </div> */}