"use client";
import { Button } from "@/components/ui/button";
import { convertFileToBase64 } from "@/lib/base64Converter";
import { UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragAndDrop({
  setSelectedFile,
}: {
  setSelectedFile: any;
}) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <div
        {...getRootProps()}
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-primary border-opacity-20 shadow-sm h-64"
        x-chunk="dashboard-02-chunk-1"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
          <div className="hover:border hover:border-primary hover:scale-105 transition-all flex items-center justify-center h-20 w-20 rounded-full bg-primary bg-opacity-5 ">
            <UploadIcon className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            Drag and Drop Here or Upload File
          </h3>
        </div>
      </div>
    </>
  );
}
