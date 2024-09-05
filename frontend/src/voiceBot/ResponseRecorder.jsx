
import React, { useState, useEffect } from 'react';

const ResponseRecorder = ({ onResponse, isRecording }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    if (isRecording && !recording) {
      startRecording();
    } else if (!isRecording && recording) {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.ondataavailable = handleDataAvailable;
        recorder.start();
        setRecording(true);
      })
      .catch(err => console.error('Error accessing microphone:', err));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks(prevChunks => [...prevChunks, event.data]);
    }
  };

  const handleSave = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    

   
    onResponse('User response recorded');
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      <button onClick={handleSave}>Save Response</button>
    </div>
  );
};

export default ResponseRecorder;
