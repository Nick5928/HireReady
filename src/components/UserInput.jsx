'use client';
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReactMarkdown from 'react-markdown';
import axios from "axios";
export default function UserInput() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [output, setOutput] = useState('');

  const scoreResume = async ({ jobDescription, resume }) => {
    const response = await axios.post("/api/score-resume", {
        jobDescription,
        resume,
    });
    return response
};

const handleSubmit = async () => {
    const response = await scoreResume({ jobDescription, resume })
    console.log(response)
    setOutput(response.data.markdown);
}

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
      setResume('Failed to parse PDF');
      return;
    }

    const data = await response.json();
    setResume(data.text || 'No text extracted');
  }

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="Resume">Upload your resume</Label>
        <Input id="Resume" type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>
      <div className="grid w-full gap-2">
            <Textarea placeholder="Type your job description here." value={jobDescription} onChange={(e) => {
                setJobDescription(e.target.value)}
                }/>
            <Button onClick={handleSubmit}>Send message</Button>
        </div>
        <div className="grid w-full gap-2 prose">
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>
    </div>


  );
}