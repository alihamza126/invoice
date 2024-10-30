"use client"
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 8,
    },
    container: {
        maxWidth: 700,
        margin: '0 auto',
        padding: 5,
        backgroundColor: '#fff',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textRight: {
        textAlign: 'right',
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: '#4a5568',
    },
    textGray: {
        color: '#4a5568',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 10,
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #e2e8f0',
        paddingVertical: 5,
    },
    tableHeader: {
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    footer: {
        marginTop: 10,
        textAlign: 'center',
        borderTop: '1px solid #cbd5e0',
        paddingTop: 5,
        color: '#718096',
    }
});

// Define document structure
const PdfClient = () => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>

                {/* Client info */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.sectionTitle}>Bill to:</Text>
                        <Text style={styles.textGray}>
                            Laravel LLC.
                            {'\n'}102, San-Fransico, CA, USA
                        </Text>
                        <Text style={styles.textGray}>info@laravel.com</Text>
                    </View>
                    <View style={styles.textRight}>
                        <Text>Invoice number: <Text style={styles.textGray}>INV-2023786123</Text></Text>
                        <Text>Invoice date: <Text style={styles.textGray}>03/07/2023</Text></Text>
                        <Text>Due date: <Text style={styles.textGray}>31/07/2023</Text></Text>
                    </View>
                </View>

                {/* Invoice Items */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader, { flex: 2 }]}>Items</Text>
                        <Text style={[styles.tableHeader, { flex: 1, textAlign: 'right' }]}>Quantity</Text>
                        <Text style={[styles.tableHeader, { flex: 1, textAlign: 'right' }]}>Price</Text>
                        <Text style={[styles.tableHeader, { flex: 1, textAlign: 'right' }]}>Amount</Text>
                    </View>

                    {/* Table Row - Example Item */}
                    <View style={styles.tableRow}>
                        <Text style={{ flex: 2 }}>T-Shirts</Text>
                        <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>500.0</Text>
                        <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>$100.00</Text>
                        <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>$5,000.00</Text>
                    </View>
                </View>

                {/* Totals */}
                <View style={[styles.tableRow, { marginTop: 10 }]}>
                    <Text style={{ flex: 3, textAlign: 'right', color: '#718096' }}>Subtotal</Text>
                    <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>$10,500.00</Text>
                </View>
                <View style={[styles.tableRow]}>
                    <Text style={{ flex: 3, textAlign: 'right', color: '#718096' }}>Tax</Text>
                    <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>$1,050.00</Text>
                </View>
                <View style={[styles.tableRow]}>
                    <Text style={{ flex: 3, textAlign: 'right', color: '#718096' }}>Discount</Text>
                    <Text style={{ flex: 1, textAlign: 'right', color: '#718096' }}>-10%</Text>
                </View>
                <View style={[styles.tableRow, { borderBottom: 'none' }]}>
                    <Text style={{ flex: 3, textAlign: 'right', fontWeight: 'bold' }}>Total</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>$11,550.00</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Developed by AH Solutions.</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PdfClient;
