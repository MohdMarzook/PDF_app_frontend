"use client";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";






export default function Translatepage({file, setFile, fromValue, toValue}) {
  const [progress, setProgress] = useState(0);
  const canUpload = file && fromValue && toValue !== "";
  const router = useRouter();
  const intervalRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const isFileTranslated = (statusId) => {
    console.log(statusId);
    console.log("File is being translated, checking status...");
    intervalRef.current = setInterval(() => {
      axios.get(`/api/status/${statusId}`, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          if (response.data.status.toLowerCase() === "translating" || response.data.status.toLowerCase() === "completed") {
            setProgress(100);
            clearInterval(intervalRef.current); 
            const pdf_link = response.data.pdfId;
            router.push(`/translation/${pdf_link}`);
          }
          if (response.data.status.toLowerCase() === "error") {
            setProgress(100);
            clearInterval(intervalRef.current);
            const pdf_link = response.data.pdfId;
            alert("Translation failed. Please try again.");
            // router.push(`/translation/${pdf_link}`);
          }
        })
        .catch(error => {
          console.error("Error checking status:", error);
          clearInterval(intervalRef.current);
        });
    }, 5000);
  }

  const uploadFile = async () => {
    setIsUploading(true);
    const formdata = new FormData();

    formdata.append("pdf", file);
    formdata.append("from_language", fromValue);
    formdata.append("to_language", toValue);

    try {
      const response = await axios.post(`/api/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 80) / progressEvent.total);
            setProgress(percentCompleted);
          }

        },
        withCredentials: true
      });

      console.log(response.data);
      isFileTranslated(response.data.statusId);
    } catch (error) {
      if (error.response?.data?.TooManyPdf) {
        alert(error.response?.data.TooManyPdf);
      }

      setIsUploading(false);
      setProgress(0);
      // Handle error here
      console.error(error.response?.data || error.message);
    }
  }
  return (
      <div className='flex justify-center items-center p-4 sm:w-full'>
          <div className='flex justify-center h-56 border-2 rounded-lg border-accent-foreground/60  w-full text lg:w-[60%] text-2xl'>
          <div className='flex items-center justify-center p-4'>
            <img src='/pdf-file.svg' alt="PDF file" className="w-20 h-20 object-contain" />
          </div>
          <div className='flex flex-col justify-center space-y-3 w-3/4 px-4'>
            <p className='font-bold text truncate lg:text-xl' title={file?.name}>
              {file ? file.name : "Can't read file name"}
            </p>
            
            <p className='font-light text-sm text-foreground lg:text-xl'>
              File Size: {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "2MB"}
            </p>
            
            <p className='text-sm text-foreground truncate lg:text-base'>
              From {fromValue.toUpperCase()} To {toValue.toUpperCase() || "Select language"}
            </p>
            
            <Progress value={progress} className="w-full" />
            
            <div className='flex justify-between space-x-2 '>
              <Button variant='outline' onClick={() => setFile(null)}>
                Remove
              </Button>
              <Button 
                onClick={canUpload & !isUploading ? uploadFile : undefined} 
                variant={canUpload ? 'default' : 'secondary'} 
                disabled={!canUpload || progress > 0}
                className="flex items-center space-x-1 w-28 justify-center"
              >
                Translate {isUploading ? <img className="w-9 dark:invert" src="/loading.svg" alt="..." /> : "   "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
