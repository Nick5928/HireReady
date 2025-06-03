"use client";
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from './ui/separator';
import { UserDetailsSheet } from './user-details-sheet';
import { ExperienceSheet } from './experience-sheet';
import { EducationSheet } from './education-sheet';
export function ProfileSection({ data }) {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy.");
    }
  };

  return (
    <div className="w-full max-w-[30%] mx-auto mt-6 space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className='flex flex-row'>
                        <p onClick={() => handleCopy(`${data.first_name} ${data.last_name}`)} className="cursor-pointer hover:underline text-2xl font-[1000]">{`${data.first_name} ${data.last_name}`}</p>
                        <div className='ml-auto'>
                            <UserDetailsSheet data={data}/>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg">
                    <p onClick={() => handleCopy(data.location)} className="cursor-pointer hover:underline">{data.location}</p>
                    <p onClick={() => handleCopy(data.email)} className="cursor-pointer hover:underline">{data.email}</p>
                    <p onClick={() => handleCopy(data.number)}className="cursor-pointer hover:underline">{data.number}</p>
                </div>
            </CardContent>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>
                <p className='font-[900] text-xl'>Education</p>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-lg">
                <ul>
                    {data.education?.map((edu, index) => (
                        <div key={index}>
                            <div className='flex'>
                                <li className="mb-2 font-normal">
                                    <p onClick={() => handleCopy(edu.school)} className="cursor-pointer hover:underline">{edu.school}</p>
                                    <p onClick={() => handleCopy(edu.degree)} className="cursor-pointer hover:underline">{edu.degree}</p>
                                    <div className='flex font-thin'>
                                        <p onClick={() => handleCopy(edu.start_year)} className="cursor-pointer hover:underline">{edu.start_year}</p>
                                        <p>-</p>
                                        <p onClick={() => handleCopy(edu.end_year)} className="cursor-pointer hover:underline">{edu.end_year}</p>
                                    </div>
                                </li>
                                <div className='ml-auto'>
                                    <EducationSheet data={edu} />
                                </div>
                            </div>
                            {index != data.education.length - 1 && (<Separator/>) }
                        </div>
                    ))}
                </ul>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>
                <p className='font-[900] text-xl'>Experience</p>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-lg">
                <ul>
                    {data.experience?.map((exp, index)=> {
                        const start_date = new Date(exp.start_date);
                        const end_date =  exp.end_date != null ? new Date(exp.end_date) : "present";

                        const start_string = `${start_date.toLocaleString('default', { month: 'long' })} ${start_date.getFullYear()}`

                        const end_string = end_date === "present" ? end_date : `${end_date.toLocaleString('default', { month: 'long' })} ${end_date.getFullYear()}`
                    return (
                        <div key ={index}>
                            <div className={`flex ${index != 0 ? 'mt-8' : 'mb-8'}`}>
                                <li className='mb-2'>
                                    <div className='flex flex-row gap-1 font-bold'>
                                        <p className='cursor-pointer hover:underline' onClick={() => handleCopy(exp.company)}>{exp.company}</p>
                                        <strong>.</strong>
                                        <p className='cursor-pointer hover:underline' onClick={() => handleCopy(exp.job_title)}>{exp.job_title}</p>
                                    </div>
                                    <div className='flex flex-row gap-1 font-thin'>
                                        <p className='cursor-pointer hover:underline' onClick={() => handleCopy(start_string)}>{start_string}</p>
                                        <strong>-</strong>
                                        <p className='cursor-pointer hover:underline' onClick={() => handleCopy(end_string)}>{end_string}</p>
                                    </div>
                                    
                                    <p className='cursor-pointer hover:underline whitespace-pre-line font-normal' onClick={() => handleCopy(exp.description)}>{exp.description}</p>
                                </li>
                                <div className='ml-auto'>
                                    <ExperienceSheet data={exp} />
                                </div>
                            </div>
                            {index != data.experience.length - 1 && (<Separator/>)}
                        </div>
                    );
                    })}
                </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}