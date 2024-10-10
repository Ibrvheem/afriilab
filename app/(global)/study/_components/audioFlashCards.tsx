"use client";
import React from "react";
import { motion } from "framer-motion";
import "./Card.css"; // You can still use this CSS for layout
import { Play } from "lucide-react";

const AudioFlashCards = ({
  card,
  currentIndex,
  index,
  flipped, // Use the flipped prop passed from HomePage
}: {
  card: { question: string; answer: string };
  currentIndex: number;
  index: number;
  flipped: boolean;
}) => {
  // Check if this card is the active one
  const isActive = currentIndex === index;

  return (
    <motion.div
      className="w-full h-[300px] cursor-pointer"
      style={{ perspective: "1000px" }} // Perspective for the 3D effect
    >
      <motion.div
        className="card-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: currentIndex === index ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="card-front flex items-center justify-center p-2 !bg-primary !bg-opacity-5 border border-primary rounded-md">
          <p className="font-bold text-center absolute top-10 underline text-primary">
            Question
          </p>
          <span className="relative flex items-center justify-center h-20 w-20">
            <span
              className={`${
                isActive
                  ? "animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                  : ""
              }`} // Apply animate-ping if active
            ></span>
            <span
              className={`${
                isActive
                  ? "animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                  : ""
              }`} // Apply animate-ping if active
            ></span>
            <Play className="h-16 w-16 text-primary" />
          </span>
        </motion.div>
        <motion.div className="card-back relative flex items-center justify-center flex-col p-2 !bg-green-500 !bg-opacity-5 border border-green-500 rounded-md">
          <p className="font-bold text-center absolute top-10 underline text-green-900">
            Answer
          </p>
          <span className="relative flex items-center justify-center h-20 w-20">
            <span
              className={`duration-1000 absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 ${
                isActive ? "animate-ping" : ""
              }`} // Apply animate-ping if active
            ></span>
            <span
              className={`animate-ping duration-1000 absolute inline-flex h-[70%] w-[70%] rounded-full bg-green-500 opacity-50 ${
                isActive ? "animate-ping" : ""
              }`} // Apply animate-ping if active
            ></span>
            <Play className="h-16 w-16 text-green-500" />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AudioFlashCards;
