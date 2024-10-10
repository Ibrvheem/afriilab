"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertFileToBase64 } from "@/lib/base64Converter";
import { UploadIcon, FileTextIcon, XIcon, FileAudioIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DragAndDrop({
  setselectedFiles,
  type,
}: {
  setselectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  type: string;
}) {
  const [filePreviews, setFilePreviews] = useState<
    { name: string; previewUrl: string | null; type: string }[]
  >([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setselectedFiles(acceptedFiles);

      const previews = await Promise.all(
        acceptedFiles.map(async (file) => {
          const fileType = file.type;
          let previewUrl = null;

          if (fileType.startsWith("image/")) {
            previewUrl = await convertFileToBase64(file);
          }

          return { name: file.name, previewUrl, type: fileType };
        })
      );
      setFilePreviews((prev) => [...prev, ...previews]);
    },
    [setselectedFiles]
  );

  const handleDelete = (index: number) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-primary border-opacity-20 shadow-sm h-64"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
          <div className="hover:border hover:border-primary hover:scale-105 transition-all flex items-center justify-center h-20 w-20 rounded-full bg-primary bg-opacity-5 ">
            {type === "pdf" ? (
              <UploadIcon className="text-primary" />
            ) : (
              <FileAudioIcon className="text-primary" />
            )}
          </div>
          <h3 className="text-md font-semibold tracking-tight">
            Drag and Drop Here or Upload{" "}
            {type === "audio" ? "an Audio" : "a PDF"} File
          </h3>
        </div>
      </div>

      <div className="mt-4">
        {filePreviews.length > 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {filePreviews.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full flex-wrap"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative flex items-center justify-center h-20 w-20 bg-primary bg-opacity-10 border border-primary rounded-lg">
                        {file.type === "application/pdf" ? (
                          <FileTextIcon className="text-primary h-10 w-10" />
                        ) : file.previewUrl ? (
                          <img
                            src={file.previewUrl}
                            alt={`preview-${index}`}
                            className="relative h-20 w-20 object-contain rounded-lg shadow bg-primary bg-opacity-10 p-1 border border-primary"
                          />
                        ) : (
                          <FileTextIcon className="text-primary h-10 w-10" />
                        )}
                        <XIcon
                          className="h-5 w-5 p-1 absolute -top-2 -right-2 bg-black bg-opacity-50 rounded-full text-white cursor-pointer"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black bg-opacity-50">
                      <p className="text-white font-bold">{file.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No files selected yet</p>
        )}
      </div>
    </>
  );
}
