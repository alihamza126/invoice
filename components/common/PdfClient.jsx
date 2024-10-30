"use client";
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Pdfdoc from './Pdfdoc';

const PdfClient = ({ allData,companyInfo}) => {
    const [data, setData] = useState(allData);

    useEffect(() => {
        // Update the local state whenever allData changes to trigger a re-render
        // console.log("changed")
        setData(allData);
    }, [allData]);

    return (
        <div className="text-center">
            {/* PDF Preview */}
            <div className="my-4">
                <PDFViewer style={{ width: '100%', height: '500px' }}>
                    <Pdfdoc allData={data} companyInfo={companyInfo}/>
                </PDFViewer>
            </div>
        </div>
    );
};

export default PdfClient;
