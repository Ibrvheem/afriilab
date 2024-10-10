"use client";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import { Page } from "@/components/organisms/page";
import CreateButton from "./_components/CreateButton";
import AudioFlashCards from "./_components/audioFlashCards";

function HomePage() {
  const audioFiles = [
    { question: "question_1.mp3", answer: "answer_1.mp3" },
    { question: "question_2.mp3", answer: "answer_2.mp3" },
    { question: "question_3.mp3", answer: "answer_3.mp3" },
    { question: "question_4.mp3", answer: "answer_4.mp3" },
    { question: "question_5.mp3", answer: "answer_5.mp3" },
    { question: "question_6.mp3", answer: "answer_6.mp3" },
    { question: "question_7.mp3", answer: "answer_7.mp3" },
    { question: "question_8.mp3", answer: "answer_8.mp3" },
    { question: "question_9.mp3", answer: "answer_9.mp3" },
    { question: "question_10.mp3", answer: "answer_10.mp3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [showCards, setShowCards] = useState(false);

  // const handleClick = () => {
  //   setTapCount((prev) => prev + 1);

  //   if (tapTimeout) {
  //     clearTimeout(tapTimeout);
  //   }

  //   setTapTimeout(
  //     setTimeout(() => {
  //       switch (tapCount) {
  //         case 0:
  //           playAudio(audioFiles[currentIndex].question); // 1st tap: play question
  //           break;
  //         case 1:
  //           playAudio(audioFiles[currentIndex].answer); // 2nd tap: play answer
  //           break;
  //         case 2:
  //           handleNextCard(); // 3rd tap: next question
  //           break;
  //         case 3:
  //           handlePreviousCard(); // 4th tap: previous question
  //           break;
  //         default:
  //           break;
  //       }
  //       setTapCount(0); // Reset tap count after processing
  //     }, 300)
  //   );
  // };

  // const playAudio = (fileName: string) => {
  //   if (audioRef.current) {
  //     audioRef.current.pause(); // Pause any currently playing audio
  //   }
  //   audioRef.current = new Audio(`/audio_files/${fileName}`);
  //   audioRef.current
  //     .play()
  //     .catch((error) => console.error("Error playing audio:", error));
  // };

  // const handleNextCard = () => {
  //   setCurrentIndex((prevIndex) => {
  //     const nextIndex = (prevIndex + 1) % audioFiles.length; // Get next index
  //     playAudio(audioFiles[nextIndex].question); // Immediately play the next question
  //     return nextIndex; // Update state with next index
  //   });
  // };

  // const handlePreviousCard = () => {
  //   setCurrentIndex((prevIndex) => {
  //     const nextIndex = (prevIndex - 1 + audioFiles.length) % audioFiles.length; // Get previous index
  //     playAudio(audioFiles[nextIndex].question); // Immediately play the previous question
  //     return nextIndex; // Update state with previous index
  //   });
  // };

  // useEffect(() => {
  //   const handleGlobalClick = () => {
  //     handleClick(); // Handle click globally
  //   };

  //   window.addEventListener("click", handleGlobalClick);

  //   return () => {
  //     window.removeEventListener("click", handleGlobalClick);
  //   };
  // }, [currentIndex, tapCount]);

  return (
    <Page
      title="Your Study"
      description="Explore all your courses"
      actions={
        <CreateButton showCards={showCards} setShowCards={setShowCards} />
      }
    >
      {!showCards ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-4 gap-2 relative">
          {audioFiles.map((card, index) => (
            <AudioFlashCards
              key={index}
              card={card}
              currentIndex={currentIndex}
              index={index}
            />
          ))}
        </div>
      )}
      <audio ref={audioRef} />
    </Page>
  );
}

export default HomePage;
