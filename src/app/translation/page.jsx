"use client";

import { useEffect, useState } from "react";    
import  PdfCard  from '@/components/PdfCard';
import axios from "axios";

const data = {
	"pdfs": [
        {
            "id": 2202,
            "userId": "88e86a0b-94eb-4e21-8b35-4cac7a8db585",
            "fromLanguage": "auto",
            "toLanguage": "ar",
            "pdf_key": "cc6bc09d-590a-458d-b0e5-70015c778bef-User guide.pdf",
            "pdfId": "1b318b02-8d7e-4a63-9b75-9ebaf1d06b80",
            "status": "COMPLETED",
            "createdAt": "2025-09-19T14:38:18.724367"
        },
        {
            "id": 2203,
            "userId": "88e86a0b-94eb-4e21-8b35-4cac7a8db585",
            "fromLanguage": "auto",
            "toLanguage": "ta",
            "pdf_key": "9ff29a7b-5a52-4b38-8f43-8999501a00d9-sample.pdf",
            "pdfId": "e77509f0-37e9-472e-9400-cd0c9271cc1e",
            "status": "COMPLETED",
            "createdAt": "2025-09-19T14:55:41.331137"
        },
        {
            "id": 2204,
            "userId": "88e86a0b-94eb-4e21-8b35-4cac7a8db585",
            "fromLanguage": "auto",
            "toLanguage": "ta",
            "pdf_key": "19ff29a7b-5a52-4b38-8f43-8999501a00d9-sample.pdf",
            "pdfId": "1e77509f0-37e9-472e-9400-cd0c9271cc1e",
            "status": "COMPLETED",
            "createdAt": "2025-09-19T14:55:41.331137"
        },
        {
            "id": 2204,
            "userId": "88e86a0b-94eb-4e21-8b35-4cac7a8db585",
            "fromLanguage": "auto",
            "toLanguage": "ta",
            "pdf_key": "19ff29a7b-5a52-4b38-8f43-8999501a00d9-sample.pdf",
            "pdfId": "1e77509f0-37e9-472e-9400-cd0c9271cc1e",
            "status": "COMPLETED",
            "createdAt": "2025-09-19T14:55:41.331137"
        },
	]
}

const PageView = () => {
    const [pdfs, setPdfs] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/translated`, { withCredentials: true });
                setPdfs(response.data.pdfs);
            } catch (error) {
                console.error("Error fetching translation data:", error);
            }
            setLoading(false);
        };
        fetchData();

    }, []);
    if (loading) {
        return <div className="text-center align-middle p-5">Loading...</div>;
    }
    if (!pdfs || pdfs.length === 0) {
        return <div className="text-center align-middle p-5">No translated PDFs found.</div>;
    }
    const deletePdf = (pdfId) => {
        setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.pdfId !== pdfId));
    }
    return (
      <>
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Your Translated PDFs</h1>
            <div className="mx-auto flex max-w-4xl flex-wrap  gap-4 p-4">
                {pdfs.map((pdf) => (
                    <PdfCard key={pdf.id} pdf={pdf} onDelete={deletePdf} />
                ))}
            </div>
        </div>
      </>
    );
}

export default PageView;