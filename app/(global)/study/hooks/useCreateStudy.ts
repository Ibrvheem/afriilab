"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadStudy } from "../services";
import axios from "axios";

export function useCreateStudy() {
  const [selectedFile, setSelectedFile] = useState<File[]>([]); // Initialize as an empty array
  const form = useForm({});

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (values) => {
    if (selectedFile.length === 0) return;

    const formData = new FormData();
    formData.append("email", "moses@awarri.com");

    // Append each selected file to the form data
    selectedFile.forEach((file) => {
      formData.append("files", file, file.name);
    });

    try {
      // const response = await axios.post('http://localhost:2000/upload_docs', formData, {
      const response = await axios.post(
        "https://demo-app-775818477993.us-central1.run.app//upload_docs/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  });

  return {
    onSubmit,
    form,
    setSelectedFile,
  };
}
