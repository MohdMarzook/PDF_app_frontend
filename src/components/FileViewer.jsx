
import React, { useState, useEffect, useRef } from 'react';
import IframeLoading from '@/components/Iframeloading'

function ClientSideFetchViewer({ fileUrl}) {
  const [contentUrl, setContentUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (fileUrl == null) {
      setLoading(true);
      return;
    }

    const fetchHtmlContent = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`CORS or network error: ${response.statusText}`);
        }
        const htmlText = await response.text();
        const blob = new Blob([htmlText], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        setContentUrl(blobUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlContent();

    return () => {
      if (contentUrl) {
        URL.revokeObjectURL(contentUrl);
      }
    };
  }, [fileUrl]);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleDownload = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const link = document.createElement('a');
      link.href = contentUrl;
      link.download = 'translated.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="w-full mx-auto overflow-hidden h-[775px] rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row-reverse gap-4">
          {/* Skeleton for download buttons (desktop) */}
          <div className="hidden md:flex flex-col items-center justify-start gap-3 pt-2">
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
          {/* Skeleton for download buttons (mobile) */}
          <div className="flex md:hidden flex-row items-center justify-center gap-2 mb-2">
            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-12 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-12 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>
          {/* Skeleton for iframe viewer */}
          <IframeLoading heading={"Loading Translated PDF"} />
        </div>
      </div>  
    );
  }

  if (error) {
    return (
      <div>
        <h3 style={{ color: 'red' }}>Request Failed</h3>
        <p>Content link got expired</p>
      </div>
    );
  }

  return (
    <div
      className="w-full mx-auto overflow-hidden h-[770px] rounded-lg shadow-md p-4"
    >
      <div className="flex flex-col md:flex-row-reverse gap-4">
        {/* Sidebar for download buttons (desktop) */}
        <div className="hidden md:flex flex-col items-center justify-start gap-3 pt-2">
          <p className="text-xs text-gray-500 text-center mb-2">
            Download <br /> as:
          </p>
          <button
            onClick={handlePrint}
            className="w-full px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer transition"
          >
            PDF
          </button>
          <button
            onClick={handleDownload}
            className="w-full px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-blue-700 border-none cursor-pointer transition"
          >
            HTML
          </button>
        </div>
        {/* Download buttons (mobile) */}
        <div className="flex md:hidden flex-row items-center justify-center gap-2 mb-2">
          <p className="text-xs text-gray-500 text-center">
            Download as:
          </p>
          <button
            onClick={handlePrint}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer transition"
          >
            PDF
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-blue-700 border-none cursor-pointer transition"
          >
            HTML
          </button>
        </div>
        {/* Iframe viewer */}
        <div className="flex-1 md:pt-4">
          <iframe
            ref={iframeRef}
            src={contentUrl}
            title="HTML Viewer"
            width="100%"
            height="735px"
            className="border rounded-lg bg-[#fafafa] w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ClientSideFetchViewer;