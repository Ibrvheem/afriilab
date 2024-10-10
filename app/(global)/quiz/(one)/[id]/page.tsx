import React from "react";
import QuestionCard from "../../_components/QuestionCard";
import { getQuizzes, revalidateCache } from "../../services";

async function page({ params }: { params: { id: string } }) {
  const quiz = await getQuizzes({});
  console.log(quiz);
  return (
    <div className="flex items-center flex-col gap-3 justify-center h-[70vh]">
      <QuestionCard quiz={quiz} />
    </div>
  );
}

export default page;
