'use client';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
export default function Job_Description () {
    const [jobDescription, setJobDescription] = useState('');
    const scoreResume = async ({jobDescription}) => {
        const response = await axios.post("/api/score-resume", {
            jobDescription,
        });
    };

    const handleSubmit = async () => {
        const response = await scoreResume({jobDescription})
    }
    return (
        <div className="grid w-full gap-2">
            <Textarea placeholder="Type your message here." value={jobDescription} onChange={(e) => {
                console.log("test");
                setJobDescription(e.target.value)}
                }/>
            <Button onClick={handleSubmit}>Send message</Button>
        </div>
    );
}
