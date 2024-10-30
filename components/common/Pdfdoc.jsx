"use client";
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for a professional layout
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        backgroundColor: '#f5f5f5',
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    companyInfo: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    // invoice id
    invoiceId: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'flex-end',
        gap: 1,
        marginBottom: 15,
        paddingVertical: 5,
    },

    //shipping info start from here
    topShipInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottom: '1px solid #e0e0e0',
    },

    billTo: {
        marginBottom: 1,
        paddingBottom: 10,
        flexDirection: 'column',
        gap: 3,
        borderRight: '1px solid #e0e0e0',
        borderLeft: '1px solid #e0e0e0',
        paddingHorizontal: 10,
        flex: 1,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 12,
        color: '#4a5568',
    },
    textGray: {
        color: '#4a5568',
    },
    table: {
        marginTop: 10,
        borderTop: '1px solid #e0e0e0',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottom: '1px solid #e0e0e0',
    },
    tableHeader: {
        fontWeight: 'bold',
        color: '#333',
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5,
        textAlign: 'right',
    },
    tableCellLeft: {
        flex: 2,
        paddingHorizontal: 5,
        textAlign: 'left',
    },
    totalSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        paddingVertical: 5,
        borderTop: '1px solid #e0e0e0',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 10,
    },
    footer: {
        textAlign: 'center',
        color: '#718096',
        marginTop: 20,
        paddingTop: 10,
        borderTop: '1px solid #e0e0e0',
    }


});

// Define document structure
const Pdfdoc = ({ allData }) => {
    console.log(allData && allData)
    const total = allData[1]?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Document>
            <Page styfirstle={styles.page}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.companyInfo}>Your Company Name</Text>
                            <Text style={styles.textGray}>1234 Business Rd, Business City, CA</Text>
                            <Text style={styles.textGray}>Phone: (123) 456-7890</Text>
                            <Text style={styles.textGray}>Email: info@yourcompany.com</Text>
                        </View>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                    </View>


                    {/* Invoice ID and Date */}
                    <View style={styles.invoiceId}>
                        <Text>Invoice #: <Text style={styles.textGray}>001</Text></Text>
                        <Text>Invoice Date: <Text style={styles.textGray}>03/07/2023</Text></Text>

                    </View>

                    {/* Bill-To Information and ship to info */}
                    <View style={styles.topShipInfo}>
                        <View style={styles.billTo}>
                            <Text style={styles.sectionTitle}>To:</Text>
                            <Text>Recipient Name: <Text style={styles.textGray}>{allData[0]?.name}</Text></Text>
                            <Text>Email: <Text style={styles.textGray}>{allData[0]?.email}</Text></Text>
                            <Text>Phone:   <Text style={styles.textGray}>{allData[0]?.phone}</Text></Text>
                            <Text>Address: <Text style={styles.textGray}>{allData[0]?.deliveryAddress}</Text></Text>
                        </View>
                        <View style={styles.billTo}>
                            <Text style={styles.sectionTitle}>Ship To:</Text>
                            <Text>Recipient Name: <Text style={styles.textGray}>Ali Hamza</Text></Text>
                            <Text>Email: <Text style={styles.textGray}>info@laravel.com</Text></Text>
                            <Text>Phone:   <Text style={styles.textGray}>03037828419</Text></Text>
                            <Text>Address: <Text style={styles.textGray}>Bahalpur pakistan</Text></Text>
                        </View>
                    </View>

                    {/* Invoice Items Table */}
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeader, styles.tableCellLeft]}>Item</Text>
                            <Text style={[styles.tableHeader, styles.tableCell]}>Quantity</Text>
                            <Text style={[styles.tableHeader, styles.tableCell]}>Unit Price</Text>
                            <Text style={[styles.tableHeader, styles.tableCell]}>Amount</Text>
                        </View>

                        {/* Table Rows - Example Item */}
                        {
                            allData[1]?.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCellLeft}>{item.product}</Text>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>$ {item.price}</Text>
                                    <Text style={styles.tableCell}>$ {item.price * item.quantity}</Text>
                                </View>
                            ))
                        }
                    </View>

                    {/* Totals Section */}
                    <View style={styles.totalSection}>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '3', marginTop: '8' }}>
                            <Text style={styles.totalLabel}>Subtotal : <Text style={{ padding: '3', border: "2px soild gray" }}>{total}</Text></Text>
                            <Text style={styles.totalLabel}>Tax ({allData[0]?.email}%) : $1,050.00</Text>
                            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total Due : $15,550.00</Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Thank you for your business!</Text>
                        <Text>Payment due within 30 days.</Text>
                        <Text>If you have any questions, contact us at info@yourcompany.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Pdfdoc;
