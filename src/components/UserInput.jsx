'use client';
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import axios from "axios";
export default function UserInput() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('score')
  const toggleMode = () => {
    setMode(prev => (prev === 'optimize' ? 'score' : 'optimize'))
  }

  const scoreResume = async ({ jobDescription, resume }) => {
    const response = await axios.post("/api/score-resume", {
        jobDescription,
        resume,
    });
    return response
  };


  const optimizeResume = async ({ resume }) => {
    const response = await axios.post("/api/ats-optimize", {
        resume,
    });
    return response
  };

  const handleSubmit = async () => {
      if(mode === "score") {
        const response = await scoreResume({ jobDescription, resume })
        setOutput(response.data.markdown);
      }
      else {
        const response = await optimizeResume({ resume , jobTitle })
        setOutput(response.data.markdown);
      }
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
      <div className="max-w-[70%] mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-4">ATS Resume Optimizer & Scorer</h1>
        <p className="text-lg text-gray-700 mb-2">
          An Applicant Tracking System (ATS) is used by employers to automatically filter and rank resumes based on job relevance. This tool helps you either tailor your resume for ATS or evaluate how well it performs against a job description.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Use the <strong>Toggle Mode</strong> button below to switch between:
        </p>
        <ul className="text-left text-gray-700 list-disc list-inside mb-6 max-w-[90%] md:max-w-[75%]">
          <li>
            <strong>Optimize Mode:</strong> Enter a job title and get an AI-enhanced resume tailored to pass ATS screening.
          </li>
          <li>
            <strong>Score Mode:</strong> Upload your resume and paste a job description to receive an ATS-style compatibility score.
          </li>
        </ul>

        <p className="text-base font-medium text-gray-600">
          Start by uploading your resume (PDF), choose a mode, and then score or optimize your resume.
        </p>
        <Button className="mt-4"onClick={toggleMode}>Toggle Mode</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[70%] rounded-lg border my-10 mx-auto">
        <div className="grid grid-rows-4 border-b md:border-b-0 md:border-r md:border-l">
          <div className="row-span-1 p-6 border-b">
            <div className='mb-2 min-w-full max-w-full'>
              <p className="font-semibold">Resume Upload</p>
              <p className='font-light'>Upload Resume here</p>
            </div>
            <Input className='min-w-full max-w-full' id="Resume" type="file" accept="application/pdf" onChange={handleFileChange} />
              {resume && (
                <div className='grid grid-cols-1 gap-2 mt-4'>
                <p>Resume Preview</p>
                  <div className="h-[50px] md:h-[200px] overflow-y-auto border pl-4 rounded bg-white">
                    <p className="whitespace-pre-wrap text-sm text-gray-800">
                      {resume}
                    </p>
                </div>
              </div>
              )}
          </div>
          <div className="row-span-3 flex p-6">
            <div className='min-w-full max-w-full'>

              {mode != "optimize" ? (
                <>
                  <p className='mb-4'>Type job Description for scoring resume</p>
                  <Textarea className="h-[80%]" placeholder="Type your job description here." value={jobDescription} onChange={(e) => {
                    setJobDescription(e.target.value)}
                    }/>
                </>
              ) : (
                <>
                  <p className='mb-4'>Type job title for optimizing resume for that role.</p>
                  <Input id="job_title" name="job_title" placeholder="Type your job title here." onChange={(e) => {
                    setJobTitle(e.target.value)}
                    }
                  />
                </>

                
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-6">
          <p className='flex justify-center text-3xl font-bold mb-2'>{mode != "optimize" ? 'Score Resume Output' : 'ATS-Optimize Output'}</p>
          <div className='flex justify-center mb-4'>
            {jobDescription != "" && resume != "" && mode != "optimize" && (<Button onClick={handleSubmit}>Score Resume</Button>)}
            {jobTitle != "" && resume != "" && mode != "score" && (<Button onClick={handleSubmit}>Optimize Resume</Button>)}
          </div>
          <div className='w-full mx-auto'>
            <div className='prose'>
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}