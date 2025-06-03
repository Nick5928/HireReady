import { NextResponse } from 'next/server';
import { OpenAI } from "openai";


const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req) {
  try {
    const body = await req.json();
    const job_title = body.jobTitle;
    const resume = body.resume;
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: [
          {
              role: "developer",
              content: `You are an expert resume writer specialized in Applicant Tracking Systems (ATS) optimization.
                        Given a resume text, rewrite and optimize it so it:
                        - Includes relevant keywords commonly scanned by ATS in the ${job_title} field.
                        - Uses clear, concise bullet points with action verbs.
                        - Is formatted for easy parsing by ATS software.
                        - Removes any complex formatting or unnecessary graphics.
                        - Highlights skills, experience, and achievements that align with typical ATS criteria.
                        Return only the optimized resume text, no explanations.`
          },
          {
              role: "user",
              content: `Resume Text:\n\n${resume}`
          }
      ],
    });

    const modelOutput = response.output_text;
    return NextResponse.json({
      markdown: modelOutput,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}