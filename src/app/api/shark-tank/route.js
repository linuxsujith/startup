import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const startupData = await req.json();

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        console.log("Starting Shark Tank Simulation for:", startupData.startup_name);

        const prompt = `
      You are simulating a Shark Tank India pitch.
      Startup:
      Name: ${startupData.startup_name}
      Pitch: ${startupData.pitch}
      Problem: ${startupData.problem}
      Solution: ${startupData.solution}
      Target: ${startupData.target}
      Revenue Model: ${startupData.revenue}
      Stage: ${startupData.stage}

      Generate:
      1. 3 tough investor questions from different sharks.
      2. Simulated founder answers (strong but realistic).
      3. Final decision: Deal or No Deal.
      4. If deal: equity demanded %.
      5. If no deal: exact reasons.
      6. Final investor feedback for each shark.

      Return strictly in this structured JSON format:
      {
        "sharks_involved": [
          { "name": "Namita Thapar", "feedback": "", "decision": "Deal/No Deal", "equity": 0 },
          { "name": "Aman Gupta", "feedback": "", "decision": "Deal/No Deal", "equity": 0 },
          { "name": "Peyush Bansal", "feedback": "", "decision": "Deal/No Deal", "equity": 0 }
        ],
        "q_and_a": [
            { "question": "", "answer": "", "asked_by": "" },
            { "question": "", "answer": "", "asked_by": "" },
            { "question": "", "answer": "", "asked_by": "" }
        ],
        "final_verdict": {
            "is_deal": boolean,
            "total_investment": "₹X Lakhs",
            "equity_taken": "X%",
            "combined_reasoning": ""
        },
        "deal_probability_percent": 0-100
      }
    `;

        let result;
        let retryCount = 0;
        const maxRetries = 2;

        while (retryCount < maxRetries) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                if (err.message?.includes('429') && retryCount < maxRetries - 1) {
                    retryCount++;
                    const waitTime = Math.pow(2, retryCount) * 1000;
                    console.log(`Rate limited in Shark Tank. Waiting ${waitTime}ms...`);
                    await new Promise(r => setTimeout(r, waitTime));
                } else {
                    throw err;
                }
            }
        }

        const response = await result.response;
        const text = response.text();

        console.log("Shark Tank AI Response received.");

        const jsonStr = text.replace(/```json|```/g, "").trim();
        const sharkAnalysis = JSON.parse(jsonStr);

        console.log("Shark Tank Analysis parsed successfully.");

        return new Response(JSON.stringify(sharkAnalysis), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Shark Tank Simulation Error Detail:", {
            message: error.message,
            stack: error.stack
        });
        return new Response(JSON.stringify({
            error: "Failed to run Shark Tank simulation",
            details: error.message,
            isQuotaError: error.message?.includes('429') || error.status === 429
        }), {
            status: error.status || 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
