'use client';
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <div className="grid grid-cols-2 gap-2 max-w-[70%] rounded-lg border my-10 mx-auto">
        <div className="grid grid-rows-4 border-r border-l">
          <div className="row-span-1 p-6 border-b">
            <div className='mb-2'>
              <p className="font-semibold">Resume Upload</p>
              <p className='font-light'>Upload Resume here</p>
            </div>
            <Input className='min-w-sm max-w-sm' id="Resume" type="file" accept="application/pdf" onChange={handleFileChange} />
            {jobDescription != "" && resume != "" && (<div className='flex justify-start'><Button className="mt-4"onClick={handleSubmit}>Score Resume</Button></div>)}
          </div>
          <div className="row-span-3 flex p-6">
            <div className='min-w-lg max-w-lg'>
            <p className='mb-4'>Type job Description for scoring resume</p>
            <Textarea placeholder="Type your job description here." value={jobDescription} onChange={(e) => {
                      setJobDescription(e.target.value)}
                      }/>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className='flex justify-center text-3xl font-bold mb-2'>Model Output</p>
          <div className='prose mx-auto'>
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>


  );
}