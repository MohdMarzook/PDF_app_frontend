"use client"

export default function PdfViewer({ pdfUrl }) {
    if (pdfUrl == null) {
        return <div>Loading PDF...</div>;
    }
  if (pdfUrl === "") {
    return (
      <div style={{ width: "100%", maxWidth: 800, margin: "0 auto", textAlign: "center", padding: "2rem" }}>
        No PDF file specified.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto", minHeight: "500px" }}>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="690px"
        style={{ border: "none", borderRadius: 8, boxShadow: "0 2px 8px #0001" }}
      />
    </div>
  );
}