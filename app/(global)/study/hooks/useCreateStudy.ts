"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { createQuiz, revalidateCache } from "../services";

export function useCreateStudy() {
  const [selectedFiles, setselectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({});

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("email", "i.aliyu019@gmail.com");
    formData.append("langauge", values.language);
    formData.append("duration", values.duration[0]);
    selectedFiles.forEach((file) => {
      formData.append("files", file, file.name);
    });
    try {
      const response = await axios.post(
        "https://demo-app-775818477993.us-central1.run.app//upload_docs/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Cheers! 🥳",
        description: "Your flash cards are ready!",
      });
      if (response) {
        const newFormData = new FormData();
        newFormData.append("email", "i.aliyu019@gmail.com");
        newFormData.append("subject", "biology");
        try {
          const quizzes = await axios.post(
            "https://demo-app-775818477993.us-central1.run.app/create_quizes",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          await revalidateCache();
          return quizzes;
        } catch (err) {
          console.error(err);
        }
      }
      return response;
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error 🥲",
        description: "There was an error creating study. Pleaase try again",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  });

  return {
    onSubmit,
    form,
    setselectedFiles,
    loading,
    open,
    setOpen,
  };
}
