"use server";

import api from "@/lib/ky.config";

export async function uploadStudy(formData: FormData) {
  try {
    const response = await api.post("upload_docs", {
      body: formData,
      headers: {
        accept: "application/json",
      },
    });
    return response;
  } catch (err) {
    console.error("FormData error:", err);
  }
}
