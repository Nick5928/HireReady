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
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function ProfileSection({ data }) {
    const router = useRouter();
    const supabase = createClient();
    const profileIsEmpty = data.isEmpty
    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy.");
        }
    };

    const handleDelete = async (id, table) => {
        if (!id || !table) {
            return;
        }
        await supabase
            .from(table)
            .delete()
            .eq('id', id);
        router.refresh();
    }
  return (
    <div className="w-full max-w-[30%] mx-auto mt-6 space-y-8">
        <Card id="UserDetailsSection">
            <CardHeader>
                <CardTitle>
                    <div className='flex'>
                        {
                            profileIsEmpty ? (
                                <p className='text-2xl font-[1000]'>Complete Your Profile</p>
                            ) : (
                                <p onClick={() => handleCopy(`${data.first_name} ${data.last_name}`)} className="cursor-pointer hover:underline text-2xl font-[1000]">
                                    {`${data.first_name} ${data.last_name}`}
                                </p>
                            )
                        }                        
                        <div className='ml-auto'>
                            <UserDetailsSheet data={data} supabase={supabase}/>
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
        {
            !profileIsEmpty && (
                <>
                    <Card id="EducationSection">
                    <CardHeader>
                        <CardTitle>
                            <div className='flex'>
                                <p className='font-[900] text-xl'>Education</p>
                                <div className='ml-auto'>
                                        <EducationSheet data={data} supabase={supabase} type={"add"}/>
                                </div>
                            </div>
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
                                            <div className='flex gap-3 ml-auto'>
                                                <EducationSheet data={edu} supabase={supabase} type={"edit"} />
                                                <Button variant="outline" className="cursor-pointer" onClick={() => handleDelete(edu.id, 'education')}>Delete</Button>
                                            </div>
                                        </div>
                                        {index != data.education.length - 1 && (<Separator/>) }
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    </Card>
                    <Card id="ExperienceSection">
                    <CardHeader>
                        <CardTitle>
                            <div className='flex'>
                                <p className='font-[900] text-xl'>Experience</p>
                                <div className='ml-auto'>
                                    <ExperienceSheet data={data} supabase={supabase} type={"add"}/>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg">
                            <ul>
                                {data.experience?.map((exp, index)=> {
                                    const start_string = `${exp.start_month} ${exp.start_year}`

                                    const end_string = exp.end_year != "" ? `${exp.end_month} ${exp.end_year}` : "present"
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
                                            <div className='ml-auto flex gap-3'>
                                                <ExperienceSheet data={exp} supabase={supabase} type={"edit"} />
                                                <Button variant="outline" className="cursor-pointer" onClick={() => handleDelete(exp.id, 'experience')}>Delete</Button>
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
                </>
            )
        }
    </div>
  );
}