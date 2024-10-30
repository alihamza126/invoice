function generateInvoiceNumber(isFinalInvoice = false) {
    lastInvoiceOrder++; // Increment the last invoice order

    // If it's a final invoice, reset the draft version number
    if (isFinalInvoice) {
        currentDraftVersion = 1; // Reset draft version for the next invoice
    } else {
        currentDraftVersion++; // Increment draft version number
    }

    // Format the invoice number
    const invoiceNumber = `#${String(lastInvoiceOrder).padStart(3, '0')}-${currentDraftVersion}`;
    return invoiceNumber;
}

// Example usage
// const draftInvoiceNumber = generateInvoiceNumber(); // For a draft invoice
// console.log(draftInvoiceNumber); // Outputs: #001-1

// const finalInvoiceNumber = generateInvoiceNumber(true); // For the final invoice
// console.log(finalInvoiceNumber); // Outputs: #002-1

// const secondDraftInvoiceNumber = generateInvoiceNumber(); // For the next draft invoice
// console.log(secondDraftInvoiceNumber); // Outputs: #002-2

export default generateInvoiceNumber;