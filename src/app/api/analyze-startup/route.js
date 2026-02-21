import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const data = await req.json();
        const {
            startup_name,
            pitch,
            problem,
            solution,
            target,
            revenue,
            stage,
            monthly_revenue
        } = data;

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        console.log("Starting AI Analysis for:", startup_name);

        const prompt = `
      You are a professional Indian venture capitalist and startup analyst.
      Analyze the following startup idea in a structured JSON format.

      Startup Details:
      Name: ${startup_name}
      Pitch: ${pitch}
      Problem: ${problem}
      Solution: ${solution}
      Target Market: ${target}
      Revenue Model: ${revenue}
      Stage: ${stage}
      Revenue: ${monthly_revenue}

      Return response strictly in this JSON format:
      {
        "market_score": 0-10,
        "problem_strength": 0-10,
        "uniqueness_score": 0-10,
        "execution_difficulty": 0-10,
        "revenue_clarity": 0-10,
        "overall_score": 0-100,
        "funding_probability_percent": 0-100,
        "valuation_estimate_range_inr": "₹X - ₹Y",
        "top_risks": ["", "", ""],
        "investor_questions": ["", "", ""],
        "improvement_plan": ["", "", "", "", ""],
        "go_to_market_strategy": ["", "", ""],
        "competitor_analysis": "Short paragraph"
      }

      Be realistic, analytical, and investor-focused.
    `;

        let result;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                if (err.message?.includes('429') && retryCount < maxRetries - 1) {
                    retryCount++;
                    const waitTime = Math.pow(2, retryCount) * 1000;
                    console.log(`Rate limited. Waiting ${waitTime}ms before retry ${retryCount}...`);
                    await new Promise(r => setTimeout(r, waitTime));
                } else {
                    throw err;
                }
            }
        }

        const response = await result.response;
        const text = response.text();

        console.log("Raw AI Response received.");

        // Clean JSON from response (Gemini sometimes adds markdown blocks)
        const jsonStr = text.replace(/```json|```/g, "").trim();
        const analysis = JSON.parse(jsonStr);

        console.log("AI Analysis parsed successfully.");

        return new Response(JSON.stringify(analysis), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("AI Analysis Error Detail:", {
            message: error.message,
            stack: error.stack,
            model: "gemini-1.5-flash"
        });
        return new Response(JSON.stringify({
            error: "Failed to analyze startup idea",
            details: error.message,
            isQuotaError: error.message?.includes('429') || error.status === 429
        }), {
            status: error.status || 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
