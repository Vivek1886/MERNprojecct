const axios = require("axios");
const dotenv=require("dotenv");
dotenv.config()

const analyzeWithAI = async (resumeText, skills) => {
  try {
    const trimmedText = resumeText.slice(0, 4000);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON."
          },
          {
            role: "user",
            content: `
Resume:
${trimmedText}

Skills: ${skills.join(", ")}

Return:
{
  "extra_skills": [],
  "best_role": "",
  "suggestions": []
}
            `
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    const cleaned = content.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.log("GROQ ERROR FULL:", error.response?.data);
    return {
      extra_skills: [],
      best_role: "Unknown",
      suggestions: ["AI failed"]
    };
  }
};

module.exports = analyzeWithAI;