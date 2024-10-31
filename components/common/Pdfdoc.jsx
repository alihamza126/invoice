"use client";
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for a professional layout
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 5,
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
        fontSize: 8,
        fontWeight: 'bold',
        color: '#333',
    },
    invoiceTitle: {
        fontSize: 16,
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
        color: '#333',

    },
    textGray: {
        color: '#4a5568',
        fontSize: 12,
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
        color: '#111',
        fontSize: 15,
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5,
        textAlign: 'right',
        fontSize: 10,
        color: '#333',
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
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 10,
        border: '1px solid #e0e0e0',
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#333',
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
const Pdfdoc = ({ allData, companyInfo }) => {
    // console.log(companyInfo, "companyInfo")
    console.log(allData)
    const total = allData[1]?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = (allData[0]?.totalTaxRate) * (total / 100)

    function getCurrentDateFormatted() {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = currentDate.getFullYear();
        // Format the date as MM/DD/YYYY
        return `${month}/${day}/${year}`;
    }

    return (
        <Document>
            <Page styfirstle={styles.page}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.companyInfo}>Company Name: {companyInfo?.companyName}</Text>
                            <Text style={styles.companyInfo}>Address: {companyInfo?.address}</Text>
                            <Text style={styles.companyInfo}>Phone: {companyInfo?.phone}</Text>
                            <Text style={styles.companyInfo}>Email: {companyInfo?.email}</Text>
                        </View>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                    </View>


                    {/* Invoice ID and Date */}
                    <View style={styles.invoiceId}>
                        <Text>Invoice: <Text style={[styles.totalLabel, { fontSize: 14 }]}>{allData[0]?.invoiceNumber}</Text></Text>
                        <Text>Invoice Date: <Text style={styles.textGray}>{getCurrentDateFormatted()}</Text></Text>

                    </View>

                    {/* Bill-To Information and ship to info */}
                    <View style={styles.topShipInfo}>
                        <View style={styles.billTo}>
                            <Text style={styles.sectionTitle}>To:</Text>
                            <Text style={styles.sectionTitle}>Recipient Name: <Text style={styles.textGray}>{allData[0]?.name}</Text></Text>
                            <Text style={styles.sectionTitle}>Email: <Text style={styles.textGray}>{allData[0]?.email}</Text></Text>
                            <Text style={styles.sectionTitle}>Phone:   <Text style={styles.textGray}>{allData[0]?.phone}</Text></Text>
                            <Text style={styles.sectionTitle}>Address: <Text style={styles.textGray}>{allData[0]?.billingAddress}</Text></Text>
                        </View>
                        <View style={styles.billTo}>
                            <Text style={styles.sectionTitle}>Ship To: same as billing  {(allData[0]?.billingAddress == allData[0]?.deliveryAddress) ? 'Yes [X] No [ ]' : 'Yes [ ] No [X]'}</Text>
                            <Text style={styles.sectionTitle}>Recipient Name: <Text style={styles.textGray}>{(allData[0]?.billingAddress != allData[0]?.deliveryAddress) && allData[0]?.name}</Text></Text>
                            <Text style={styles.sectionTitle}>Email: <Text style={styles.textGray}>{(allData[0]?.billingAddress != allData[0]?.deliveryAddress) && allData[0]?.email}</Text></Text>
                            <Text style={styles.sectionTitle}>Phone:   <Text style={styles.textGray}>{(allData[0]?.billingAddress != allData[0]?.deliveryAddress) && allData[0]?.phone}</Text></Text>
                            <Text style={styles.sectionTitle}>Address: <Text style={styles.textGray}>{(allData[0]?.billingAddress != allData[0]?.deliveryAddress) && allData[0]?.deliveryAddress}</Text></Text>
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
                                    <Text style={[styles.tableCell, styles.tableCellLeft]}>{item.product}</Text>
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
                            <Text style={styles.totalLabel}>Subtotal : <Text style={styles.totalValue}>$ {total}</Text></Text>
                            <Text style={styles.totalLabel}>Tax :<Text style={styles.totalValue}> $ {taxPrice}</Text></Text>
                            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total Due : <Text style={styles.totalValue}> $ {total-taxPrice}</Text></Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={{ fontSize: 12 }}>{companyInfo?.policy}</Text>
                        <Text style={{ fontSize: 12 }}>----------------------------------------------</Text>
                        <Text style={{ fontSize: 12 }}>Thank you for your business!</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Pdfdoc;
