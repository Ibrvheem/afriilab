"use client";
import { Button } from "@/components/ui/button";
import { convertFileToBase64 } from "@/lib/base64Converter";
import { PlusIcon, UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateStudy } from "../hooks/useCreateStudy";

export default function EmptyState() {
  const { open, setOpen } = useCreateStudy();
  console.log(open);
  return (
    <>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-primary border-opacity-20 shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
          <div
            className="hover:border hover:border-primary hover:scale-105 transition-all flex items-center justify-center h-40 w-40 rounded-full bg-primary bg-opacity-5"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            You have no <span className="text-primary">study</span>
          </h3>
        </div>
      </div>
    </>
  );
}
