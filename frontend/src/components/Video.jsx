import React, { useState, useRef } from "react";

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const videoRef = useRef(null);
  const recordedChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const videoBlob = new Blob(recordedChunks.current, {
          type: "video/webm",
        });
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoURL(videoURL);
        await sendVideoToBackend(videoBlob); // Send to backend when recording stops
      };

      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop camera stream
  };

  const sendVideoToBackend = async (videoBlob) => {
    const formData = new FormData();
    formData.append("video", videoBlob, "video.webm");

    try {
      await fetch("http://localhost:3000/upload-video", {
        method: "POST",
        body: formData,
      });
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="400" height="300" controls />
      <br />
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {videoURL && <video src={videoURL} controls width="400" />}
    </div>
  );
}

export default VideoRecorder;
