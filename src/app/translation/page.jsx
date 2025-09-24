"use client";

import { useEffect, useState } from "react";    
import  PdfCard  from '@/components/PdfCard';
import axios from "axios";


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