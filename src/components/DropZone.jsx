import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onFileDrop }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        
        const syntheticEvent = {
          target: {
            files: acceptedFiles
          }
        };
        onFileDrop(syntheticEvent);
      }
    },
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div className="h-full w-full">
      <div {...getRootProps({ className: "dropzone h-full w-full flex flex-col items-center justify-center cursor-pointer" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
      </div>
    </div>
  );
}

export default Dropzone;