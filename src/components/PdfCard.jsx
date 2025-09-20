import axios from "axios";

const PdfCard = ({ pdf, onDelete }) => {
  // Extract the original file name from pdf_key (removing the UUID prefix)
  const fileName = pdf.pdf_key.slice(37);
  
  // Format date to be more readable
  const formattedDate = new Date(pdf.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

    function deletePdf(pdfId) {

        axios.delete(`/api/translated/pdf/${pdfId}`, { withCredentials: true })
        .then(response => {
            if (response.data.success) {
                // Optionally, you can add logic to remove the deleted PDF from the UI
                onDelete(pdfId);
                alert("PDF deleted successfully");
            }
        })
        .catch(error => {
            console.error("There was an error deleting the PDF!", error);
        });
    }
    function viewPdf(pdfId) {
        window.open(`/translation/${pdfId}`, "_blank");
    }
    async function downloadPdf(pdfId) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Set the iframe's source to the HTML file's URL
        
        const response = await axios.get(`/api/translated/html/${pdfId}`, { withCredentials: true });
        iframe.src = response.data.downloadHtmlLink;
        
    

        

        // Wait for the iframe to load its content
        iframe.onload = function() {
            try {
                // Trigger the print dialog on the iframe's content
                iframe.contentWindow.print();
            } finally {
                // Clean up and remove the iframe after printing
                document.body.removeChild(iframe);
            }
        };
    }
  
  // Map language codes to readable names
  const getLanguageName = (code) => {
    const languages = {
      'auto': 'Auto-detect',
      'en': 'English',
      'ta': 'Tamil',
      'ar': 'Arabic',
      // Add more languages as needed
    };
    return languages[code] || code;
  };

  return (
    <div className="bg-accent rounded-lg shadow-md hover:shadow-lg transition-shadow p-5  w-full">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg  max-w-xs truncate" title={fileName}>
            {fileName}
          </h3>
          <div className="flex items-center mt-2 text-sm    ">
            <span className="mr-2">
              {getLanguageName(pdf.fromLanguage)} → {getLanguageName(pdf.toLanguage)}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          pdf.status === 'COMPLETED' ? 'bg-green-400 text-black' : 
          pdf.status === 'PROCESSING' ? 'bg-yellow-400 text-black' : 
          'bg-gray-400  text-black'
        }`}>
          {pdf.status}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">{formattedDate}</span>
        
        <div className="flex space-x-2">
          <button onClick={() => deletePdf(pdf.pdfId)} className="px-3 py-1 bg-red-500 hover:bg-amber-600 rounded transition-colors">
            Delete
          </button>
          <button onClick={() => viewPdf(pdf.pdfId)} className="px-3 py-1 dark:bg-gray-700 border border-black  rounded hover:bg-gray-400 hover:dark:bg-gray-600 transition-colors">
            View
          </button>
          <button onClick={() => downloadPdf(pdf.pdfId)} className="px-3 py-1 dark:bg-gray-700 border border-black rounded hover:bg-gray-400 hover:dark:bg-gray-600 transition-colors">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;