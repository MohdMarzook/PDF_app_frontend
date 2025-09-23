'use client'
import { Selectlanguage } from '@/components/Selectlanguage';
import  Translatepage  from '@/components/translate';
import React, { useEffect, useState } from 'react'
import { FaLanguage } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Dropzone  from "@/components/DropZone"
import { TbBrowserPlus } from "react-icons/tb";

import axios from 'axios';




const page = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fromValue, setFromValue] = useState("auto");
  const [toValue, setToValue] = useState("");
  const [file, setFile] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/getprofile", {
        withCredentials: true
      }); 
      const langlist = await axios.get("api/languagelist")
      setLanguages(langlist.data.map(({ id, language, code }) => ({ label: language, value: code })));
    }
    fetchData();
  }, [])
  const filehandelar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      } 
      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        alert("File size exceeds 5 MB limit.");
        return;
      }
      setFile(file);
    }
  }



  const exchangeLanguage = React.useCallback(() => {
    if (fromValue === "auto" || toValue === "") {
      return;
    }
    const temp = fromValue; 
    setFromValue(toValue);
    setToValue(temp);
  }, [fromValue, toValue]);
  
  return (
    <div className='flex justify-center items-center min-h-screen -mt-16 '>
      <div className='flex flex-col w-full bg-accent mx-4 sm:mx-[12%] rounded-2xl shadow-gray-600 shadow-xl'>
        {/* this is the from and to language inputs section */}
        {/* <div className='grid grid-cols-9 grid-rows-1 items-center h-fit w-full px-7 gap-2 py-5'> */}
        <div className='flex flex-col lg:grid grid-cols-9 grid-rows-1 items-center h-fit w-full px-7 gap-2 py-5'>
          <div className='hidden lg:block col-span-1 '>
            <FaLanguage size={56} />
          </div>
          <div className='md:col-span-3 flex justify-center scale-110 lg:scale-110'>
            <Selectlanguage  languages={languages.filter((language) => language.value !== toValue)}  onValueChange={setFromValue} currentValue={fromValue} />
          </div>
          <div className='md:col-span-1 flex justify-center items-center'>
            <Button variant='outline' onClick={exchangeLanguage} className='w-11 h-11 p-1.5 rounded-full shadow-gray-700 shadow-lg'>
              <FaArrowRightArrowLeft className='w-4 h-4' />
            </Button>
          </div>
          <div className='md:col-span-3 flex justify-center scale-110 lg:scale-110'>
            <Selectlanguage languages={languages.slice(1).filter((language) => language.value !== fromValue)}  onValueChange={setToValue} currentValue={toValue} />
          </div>
        </div>
        {!file ? <>
        <div className='grid grid-cols-11 items-center border-2 rounded-lg border-accent-foreground/60   mx-3 sm:mx-6.5 mb-6 h-80'>
          <div className='hidden sm:block col-span-5 h-full -mr-12 '>
            <div className='w-full pt-9'></div>
            <div className='flex h-[80%] w-[80%] mx-auto border-2 border-dashed border-accent-foreground/60 rounded-lg  items-center justify-center align-middle'>
              <Dropzone onFileDrop={filehandelar} />
            </div>
          </div>
          <div className='hidden sm:flex col-span-1 justify-center items-center h-full sm:h-42 '>
          <Separator orientation="vertical" />
          </div>
          <div className='col-span-11 sm:col-span-5 relative h-full ml-0 sm:-ml-12'>
            <div className='flex flex-col items-center justify-center h-full space-y-4 '>
              <TbBrowserPlus className='w-12 h-12 text-muted-foreground' onClick={() => document.getElementById('file_input').click()}/>
              <h3>Choose a file</h3>
              <Input type="file" onChange={filehandelar} className="hidden" id="file_input" />
              <Button onClick={() => document.getElementById('file_input').click()}>Browse your file</Button>
              <div className='absolute bottom-8'>
                <span>Supported file types: .pdf</span>
              </div>
            </div>
          </div>
        </div>
          </>
        : 
        <>
         <Translatepage file={file} setFile={setFile} fromValue={fromValue} toValue={toValue} />
        </>
        }
      </div>
    </div>
  )
}

export default page