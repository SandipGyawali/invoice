'use client';
import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // You can customize language
      speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="border p-2 w-full mb-4"
        rows={4}
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={speak}
      >
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
