"use client";
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProfileSection() {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <div className="w-full max-w-[50%] mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Enter your information here for easy copy/paste. Click to copy</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 text-sm">
                <div className='flex flex-row gap-1'>
                    <p>
                        <strong>Location</strong>
                    </p>
                    <p 
                        onClick={() => handleCopy("john.doe@example.com")}
                        className="cursor-pointer hover:underline"
                    >
                        New York, NY
                    </p>
                </div>
                <div className='flex flex-row gap-1'>
                    <p>
                        <strong>Email:</strong>
                    </p>
                    <p 
                        onClick={() => handleCopy("john.doe@example.com")}
                        className="cursor-pointer hover:underline"
                    >
                        john.doe@example.com
                    </p>
                </div>
                <div className='flex flex-row gap-1'>
                    <p>
                        <strong>Number:</strong>
                    </p>
                    <p 
                        onClick={() => handleCopy("john.doe@example.com")}
                        className="cursor-pointer hover:underline"
                    >
                        (123) 456-7890
                    </p>
                </div>
                <strong>Education:</strong>
                <ul className="ml-4 list-disc">
                    <li>
                        <div className='flex flex-row gap-1'> 
                            <p>
                            <strong>School:</strong>
                            </p>
                            <p 
                                onClick={() => handleCopy("john.doe@example.com")}
                                className="cursor-pointer hover:underline"
                            >
                            University of Example
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className='flex flex-row gap-1'> 
                            <p>
                            <strong>Degree: </strong>
                            </p>
                            <p 
                                onClick={() => handleCopy("john.doe@example.com")}
                                className="cursor-pointer hover:underline"
                            >
                                B.S. in Computer Science
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className='flex flex-row gap-1'> 
                            <p 
                                onClick={() => handleCopy("john.doe@example.com")}
                                className="cursor-pointer hover:underline"
                            >
                                2018
                            </p>
                            <p>-</p>
                            <p 
                                onClick={() => handleCopy("john.doe@example.com")}
                                className="cursor-pointer hover:underline"
                            >
                                2022
                            </p>
                        </div>
                    </li>
                </ul>
                

                <div
                onClick={() =>
                    handleCopy(`Experience:
    Job Title: Software Engineer
    Company: Example Inc. — San Francisco, CA
    Start Date: Jan 2023
    End Date: Present
    Description: Worked on developing web applications with React and Node.js.`)
                }
                className="cursor-pointer hover:underline"
                >
                <strong>Experience:</strong>
                <ul className="ml-4 list-disc">
                    <li>Job Title: Software Engineer</li>
                    <li>Company: Example Inc. — San Francisco, CA</li>
                    <li>Start Date: Jan 2023</li>
                    <li>End Date: Present</li>
                    <li>Description: Worked on developing web applications with React and Node.js.</li>
                </ul>
                </div>

                <p
                onClick={() => handleCopy("LinkedIn: https://linkedin.com/in/johndoe")}
                className="cursor-pointer hover:underline"
                >
                <strong>Links:</strong>{" "}
                <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
                </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}