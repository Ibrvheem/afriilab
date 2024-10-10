// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MagicWandIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { AudioLinesIcon, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

export default function LiveRecordButton({
  setShowCards,
  showCards, // Accept flipped state from HomePage
}: {
  setShowCards: any;
  showCards: any;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // New state for audio playback
  const mediaRecorderRef = useRef(null);
  const { toast } = useToast();

  const handleRecordingStart = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        // Check if the blob is valid
        if (audioBlob.size > 0) {
          const audioUrl = URL.createObjectURL(audioBlob); // Create URL for playback
          setAudioUrl(audioUrl); // Set the audio URL for playback
        } else {
          console.error("Audio Blob is empty or invalid");
        }

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64String = reader.result;
          setAudioData(base64String);
          stream.getTracks().forEach((track) => track.stop());
        };
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const handleRecordingStop = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  async function handleSendAudio() {
    if (audioData != null) {
      try {
        const response = await axios.post(
          "https://demo-app-775818477993.us-central1.run.app/upload_audios/",
          {
            audio_base64_content: audioData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        return response;
      } catch (err) {
        console.error(err);
        toast({
          title: "Oops",
          description:
            "There was an error sending your speech. Please try again🥲",
        });
      }
    }
  }

  const handleClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      setLoading(false); // After 10 seconds, set loading to false
      toast({
        description: "Your Flash Cards have been created 😉",
      });
      setShowCards(true);
    }, 5000); // 10 seconds in milliseconds
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-center flex-col rounded-lg border border-dashed border-primary border-opacity-20 shadow-sm h-64">
        <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
          <>
            {!isRecording ? (
              <div
                onClick={() => {
                  handleRecordingStart();
                  setIsRecording(true);
                }}
                className="hover:border hover:border-primary hover:scale-105 transition-all flex items-center justify-center h-20 w-20 rounded-full bg-primary bg-opacity-5 "
              >
                <AudioLinesIcon className="text-primary" />
              </div>
            ) : (
              <div
                onClick={() => {
                  handleRecordingStop();
                  setIsRecording(false);
                }}
                className="hover:border hover:border-primary hover:scale-105 transition-all flex items-center justify-center h-20 w-20 rounded-full bg-primary bg-opacity-5 "
              >
                <Pause className="text-primary" />
              </div>
            )}
            <h3 className="text-md font-semibold tracking-tight">
              Click to Record an Audio
            </h3>
          </>
        </div>

        {audioData && (
          <>
            {/* Add audio player for playback */}
            {audioUrl && (
              <div className="mt-4">
                <audio controls src={audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <Button
              type="button"
              loading={loading}
              className="bg-black my-2"
              onClick={() => {
                handleClick();
              }}
            >
              Generate Study{" "}
              <MagicWandIcon className="ml-1 h-4 w-4 text-primary" />
            </Button>
          </>
        )}
      </div>
    </>
  );
}
