"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

function page({ params }: { params: { id: string } }) {
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

  return (
    <div className="flex items-center flex-col gap-3 justify-center h-[70vh]">
      <h1 className="text-xl font-bold">Question 1 of 50</h1>
      <div className="flex items-center gap-7">
        <div className="h-8 w-8 border hover:bg-slate-100 rounded-full flex items-center justify-center">
          <MinusIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Card>
          <CardHeader>
            <motion.div
              variants={questionVariants}
              initial="hidden"
              animate="visible"
            >
              <CardTitle>
                <span className="text-primary text-lg">1. </span>
                Lorem ipsum dolor sit amet Lorem, ipsum?
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            {["Option 1", "Option 2", "Option 3", "Option 4"].map(
              (option, index) => (
                <motion.div
                  key={index}
                  custom={index} // Passing index to create staggered delay
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={optionHover}
                  className={`hover:bg-slate-50 cursor-pointer border h-10 rounded-md flex items-center p-4 font-semibold ${
                    index === 1
                      ? "border-primary border-opacity-50 bg-primary bg-opacity-5"
                      : ""
                  }`}
                >
                  {option}
                </motion.div>
              )
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-end justify-end">
              <Button
                variant={"ghost"}
                className="text-primary opacity-80 font-semibold tracking-wide hover:text-primary hover:opacity-100"
              >
                Confirm
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className="h-8 w-8 border hover:bg-slate-100 rounded-full flex items-center justify-center">
          <PlusIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

export default page;
