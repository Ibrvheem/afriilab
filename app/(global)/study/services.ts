"use server";

import api from "@/lib/ky.config";
import { revalidatePath } from "next/cache";

export async function getFlashCards() {
  try {
    const response = await api
      .get(`get_flash_cards?email=i.aliyu019@gmail.com&subject=biology`, {
        cache: "no-store",
      })
      .json();

    console.log(response, "service");
    return response;
  } catch (err) {
    console.error("FormData error:", err);
  }
}
export async function createQuiz({
  email,
  subject,
}: {
  email: string;
  subject: string;
}) {
  try {
    const response = await api
      .post("create_quizes", { json: { email, subject } })
      .json();
    return response;
  } catch (err) {
    console.error("FormData error:", err);
  }
}
export async function revalidateCache() {
  await revalidatePath(`/study`);
}
