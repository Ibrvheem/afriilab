"use client";
import React, { useState, useRef } from "react";
import LiveRecordButton from "./LiveRecordButton";
const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const mediaRecorderRef = useRef(null);

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

  return (
    <div className="container-full">
      <div className="second">
        <div className="chat-container">
          <div className="chat-box">{audioData}</div>

          <div className="audio-section">
            <LiveRecordButton />
            {isRecording ? (
              <button onClick={handleRecordingStop}>Stop Recording</button>
            ) : (
              <button onClick={handleRecordingStart}>Record Voice</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
