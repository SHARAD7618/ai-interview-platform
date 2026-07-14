require("dotenv").config();
const Groq = require("groq-sdk");
const puppeteer = require("puppeteer");

// Initialize Groq with the API key from environment variables
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "PLACEHOLDER_KEY",
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    try {
        // Define the prompt with the exact JSON structure we want the AI to follow
        const prompt = `
You are an expert interview coach.

Analyze the following candidate profile and return ONLY valid JSON.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return JSON in exactly this format:
{
  "matchScore": 0,
  "technicalQuestions": [
    {
      "question": "question here",
      "intention": "intention here",
      "answer": "answer here"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "question here",
      "intention": "intention here",
      "answer": "answer here"
    }
  ],
  "skillGaps": [
    {
      "skill": "skill name",
      "severity": "low" // must be strictly "low", "medium", or "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "focus area",
      "tasks": ["task 1", "task 2"]
    }
  ],
  "title": "job title"
}

Return ONLY JSON without any extra text.
`;

        // Request Groq API to generate the response
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    // System role sets the behavior and rules for the AI
                    role: "system",
                    content: "You are an expert interview coach. Return only valid JSON."
                },
                {
                    // User role provides the actual data and instructions
                    role: "user",
                    content: prompt
                }
            ],
            // This property forces the Groq model to return a strict JSON object
            response_format: {
                type: "json_object"
            }
        });

        // Convert the string response from Groq into a Javascript object
        return JSON.parse(response.choices[0].message.content);

    } catch (err) {
        // Log the error and throw it so your application can handle it
        console.error("Groq Error:", err);
        throw err;
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        standardFontDataUrl: process.env.STANDARD_FONT_DATA_URL || "https://storage.googleapis.com/chromium-std-fonts/",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `
Generate resume for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return JSON in exactly this format:
{
  "html": "HTML content here..."
}

The HTML content should be tailored for the given job description, highlighting the candidate's strengths and relevant experience. It must be well-formatted and structured, professional, clean, ATS friendly, and ideally 1-2 pages long. Return ONLY valid JSON.
`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume builder. Return only valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            }
        });

        const jsonContent = JSON.parse(response.choices[0].message.content);
        const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
        return pdfBuffer;
    } catch (err) {
        console.error("Groq Resume PDF Error:", err);
        throw err;
    }
}

module.exports = {
    generateInterviewReport,
    generateResumePdf
};