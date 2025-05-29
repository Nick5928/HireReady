'use client';
import React, { useState } from 'react';

export default function PdfReader() {
  const [text, setText] = useState('');

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch('/api/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      setText('Failed to parse PDF');
      return;
    }

    const data = await response.json();
    setText(data.text || 'No text extracted');
  }

  return (
    <div>
      <h2>Upload your PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
    </div>
  );
}