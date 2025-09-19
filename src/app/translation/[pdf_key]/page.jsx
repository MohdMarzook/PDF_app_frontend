"use client";
import axios from 'axios';
import { useEffect, useState, use } from 'react';
import ClientSideFetchViewer from '@/components/FileViewer';
import PdfViewer from '@/components/PdfViewer';

const PdfViewPage = ({ params }) => {
  // Unwrap params if it's a Promise (future-proof)
  const { pdf_key } = typeof params.then === "function" ? use(params) : params;
  const decoded_pdf_key = pdf_key;

  const [pdfUrl, setPdfUrl] = useState(null); 
  const [htmlUrl, setHtmlUrl] = useState(null);

  useEffect(() => {
    async function fetchPdf() {
      try {
        const response = await axios.get(
          `/api/translated/pdf/${decoded_pdf_key}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setPdfUrl(response.data.originalPdfLink);
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    }
    fetchPdf();
  }, [decoded_pdf_key]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          `/api/translated/html/${decoded_pdf_key}`,
          { withCredentials: true }
        )
        .then((response) => {
          if (
            response.data.status &&
            (response.data.status.toLowerCase() === "completed" ||
              response.data.status.toLowerCase() === "error")
          ) {
            setHtmlUrl(response.data.viewHtmlLink);
            clearInterval(interval);
          }
        })
        .catch((error) => {
          console.error("Error checking status:", error);
          clearInterval(interval);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, [decoded_pdf_key]);

  return (
    <div className="flex justify-center gap-5 w-full">
      <div className='flex flex-col lg:flex-row w-full h-fit pt-1.5 gap-2 mx-4 md:mx-[1%] justify-center'>
        <div className='hidden lg:block w-[620px] h-[650px]'>
          <PdfViewer pdfUrl={pdfUrl} /> 
        </div>
        <div className='w-screen lg:w-[740px] h-[670px] -mr-0 xl:-mr-20'>
          <ClientSideFetchViewer fileUrl={htmlUrl} />
          <p className='text-sm text-gray-300 text-center -ml-2'> 
            Select and ctrl  +\- to zoom in/out
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfViewPage;