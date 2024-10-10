"use server";

import api from "@/lib/ky.config";
import { revalidatePath } from "next/cache";

export async function getQuizzes({
  email,
  subject,
}: {
  email?: string;
  subject?: string;
}) {
  try {
    const response = await api
      .get(`get_quiz?email=i.aliyu019@gmail.com&subject=Biology`, {
        cache: "no-store",
      })
      .json();

    return response;
  } catch (err) {
    console.error("FormData error:", err);
  }
}
export async function answerQuiz({
  id,
  student_response,
}: {
  id?: string;
  student_response?: string;
}) {
  try {
    const response = await api
      .post(`submit_answer?id=${id}&student_response${student_response}`, {
        json: {},
      })
      .json();
    return response;
  } catch (err) {
    console.error("FormData error:", err);
  }
}

export async function revalidateCache() {
  await revalidatePath(`/quiz`);
}

export async function review() {
  try {
    const review = await api
      .get("evaluate_performance?email=i.aliyu019@gmail.com&subject=biology")
      .json();

    console.log(review, "hhaha");
    return review;
  } catch (err) {
    console.error(err);
  }
}
