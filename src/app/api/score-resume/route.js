import { NextResponse } from 'next/server';
import { OpenAI } from "openai";


// const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


// const response = await client.responses.create({
//     model: "gpt-4.1",
//     input: [
//         {
//             role: "developer",
//             content: `You are an expert level resume reviewer and hiring manager. 
//             Review the resume based on the job description and score it out of 100.
//             Provide scores for:
//             Skills Match
//             Education Requirements
//             Keywords
//             Return a total score and a short explanation.`
//         },
//         {
//             role: "user",
//             content: "Job Description:\n\n{jobdescriptionhere}",
//         },
//         {
//             role: "user",
//             content: "Resume Text:\n\n{ResumeText}"
//         }
//     ],
// });


export async function POST(req) {
  try {
    const body = await req.json();

    console.log(body)
    return NextResponse.json({
      req
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}