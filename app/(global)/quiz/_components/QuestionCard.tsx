"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MinusIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ControlledInput from "@/components/molecules/controlledInput";
import { revalidateCache } from "../services";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function QuestionCard({ quiz }: { quiz: any }) {
  console.log(quiz);
  const [question, setQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  // Animation variants for the question text
  const questionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Define animation variants for the options
  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4, ease: "easeInOut" },
    }),
  };

  // Define hover animation for the options
  const optionHover = {
    scale: 1.02,
    backgroundColor: "#f8fafc", // equivalent to 'slate-50'
    transition: { type: "spring", stiffness: 300 },
  };
  const type = "odbj";
  const form = useForm({});
  useEffect(() => {
    revalidateCache();
  }, []);

  return quiz.cards.length > 0 ? (
    <>
      <h1 className="text-xl font-bold">
        Question {question + 1} of {quiz.cards.length}
      </h1>

      <div className="flex items-center gap-7">
        <Card className="w-[800px]">
          <CardHeader>
            <motion.div
              variants={questionVariants}
              initial="hidden"
              animate="visible"
            >
              <CardTitle>
                <span className="text-primary text-lg">{question + 1}. </span>
                {quiz?.cards[question]?.question}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            {type === "odbj" ? (
              quiz?.cards[question]?.options?.map((option, index) => (
                <motion.div
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                  key={index}
                  custom={index} // Passing index to create staggered delay
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={optionHover}
                  className={`hover:bg-slate-50 cursor-pointer border h-10 rounded-md flex items-center p-4 font-semibold ${
                    option === selectedOption
                      ? "border-primary border-opacity-50 bg-primary bg-opacity-5"
                      : ""
                  }`}
                >
                  {option}
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={optionVariants}
                initial="hidden"
                animate="visible"
              >
                <Form {...form}>
                  <form action="">
                    <ControlledInput
                      name="answer"
                      label="Your answer"
                      placeholder="your answer here"
                      className={`hover:bg-slate-50 cursor-pointer border h-10 rounded-md flex items-center p-4 font-semibold`}
                    />
                  </form>
                </Form>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-end justify-end">
              <Button
                variant={"ghost"}
                className="text-primary opacity-80 font-semibold tracking-wide hover:text-primary hover:opacity-100"
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("id", quiz?.cards[question]?.id);
                  formData.append("student_response", selectedOption);
                  try {
                    const response = await axios.post(
                      `https://demo-app-775818477993.us-central1.run.app/submit_answer?id=${quiz?.cards[question]?.id}&student_response=${selectedOption}`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    toast({
                      description: "Answer Submitted 😉",
                    });
                    if (question + 1 < quiz.cards.length)
                      setQuestion(question + 1);
                    return response;
                  } catch (err) {
                    toast({
                      description:
                        "There was an error submitting your answer 🥲",
                    });
                  }
                }}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  ) : (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex gap-1">
          Congratulations{" "}
          <CheckCircle2 className=" text-green-600 h-6 w-6 animate-bounce" />{" "}
        </CardTitle>
        <CardDescription>You've finished your quiz.</CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-center gap-2">
        <Link href="/quiz/1/review">
          <Button>See Review</Button>
        </Link>
        <Button variant={"outline"}>Do another Quiz</Button>
      </CardFooter>
    </Card>
  );
}
