"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Card.css"; // You can still use this CSS for layout

const Card = ({ card }: { card: { question: string; answer: string } }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <motion.div
      className="w-full h-[300px] cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }} // Perspective for the 3D effect
    >
      <motion.div
        className="card-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="card-front flex items-center justify-center p-2 !bg-primary !bg-opacity-5 border border-primary rounded-md">
          <p className="font-bold  text-cente absolute top-10 underline text-primary">
            Question
          </p>

          <h2 className="font-bold">{card.question}</h2>
        </motion.div>
        <motion.div className="card-back relative flex items-center justify-center flex-col p-2 !bg-green-500 !bg-opacity-5 border border-green-500 rounded-md">
          <p className="font-bold  text-cente absolute top-10 underline text-green-900">
            Answer
          </p>
          <h2 className="font-bold text-black text-center">{card.answer}</h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
