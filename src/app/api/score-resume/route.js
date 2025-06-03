import { NextResponse } from 'next/server';
import { OpenAI } from "openai";


const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req) {
  try {
    const body = await req.json();
    const jobDescription = body.jobDescription;
    const resume = body.resume;
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: [
          {
              role: "developer",
              content: `You are an expert level resume reviewer and hiring manager. 
                        Review the resume based on the job description and score it out of 100.
                        Provide scores for:
                        Skills Match
                        Education Requirements
                        Keywords
                        Return a total score and a short explanation.
                        Use --- to split each section
                        Put it in this format
                        **Resume Review and Scoring for (Role)**
                        ---
                        ### 1. Skills Match (Score:)
                        #### Job Requirements vs Resume:
                        List requirements vs resume
                        **Summary:**
                        ---
                        ### 2. Education Requirements (Score:)
                        Requirement:
                        Actual:
                        Practical:
                        Shortfall:
                        ---
                        ### 3. Keywords (Score:)
                        Keywords that appear:
                        Missing/limited or not strong:
                        Stuff like: Machine Learning is mentioned in coursework, not hands-on project work.
                        ---
                        ### 4. Total Score: **(Score:)**
                        ---
                        ### Short Explanation
                        **Explanation here**
                        **Recommendation:**`
          },
          {
              role: "user",
              content: `Job Description:\n\n${jobDescription}`,
          },
          {
              role: "user",
              content: `Resume Text:\n\n${resume}`
          }
      ],
    });

    const modelOutput = response.output_text;



    const sections = modelOutput
      .split(/\n---+\n/)
      .map(section => section.trim())  
      .filter(section => section.length > 0);


    const title = sections[0];
    const skillsMatch = sections[1];
    const educationRequire = sections[2];
    const keywords = sections[3];
    const totalScore = sections[4];
    const recommendation = sections[5]



    
    return NextResponse.json({
      markdown: modelOutput,
      parsed: {
        title,
        skillsMatch,
        educationRequire,
        keywords,
        totalScore,
        recommendation
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}