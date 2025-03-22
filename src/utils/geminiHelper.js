const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);

/**
 * Simple function to analyze symptoms using Gemini
 * @param {string} symptoms - User symptoms
 * @param {object} userProfile - User profile containing age, gender, chronic diseases, etc.
 * @returns {Promise<object>} - Structured analysis of symptoms
 */
const analyzeSymptoms = async (symptoms, userProfile) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

    let prompt = `As a healthcare assistant, analyze the following symptoms: "${symptoms}"`;

    if (userProfile) {
      prompt += `\nUser information: ${userProfile.age} years old, ${userProfile.gender}`;

      if (userProfile.chronicDiseases?.length) {
        prompt += `\nChronic conditions: ${userProfile.chronicDiseases.join(', ')}`;
      }

      if (userProfile.allergies?.length) {
        prompt += `\nAllergies: ${userProfile.allergies.join(', ')}`;
      }
    }

    prompt += `
Please behave like a medical doctor in your response. Your response should include:

1. A detailed explanation of the most likely medical condition(s) based on the symptoms.
2. Professional recommendations for treatment, both clinical and non-clinical.
3. Safe and effective home remedies or lifestyle tips the patient can try, if applicable.
4. Advice on when the patient should seek in-person medical attention.

Use a clear, informative, and empathetic tone.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Debugging log (optional)
    // console.log("AI Response:\n", text);

    // Extract all three sections from Gemini response
    return parseSections(text);

  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};

/**
 * Parses Gemini response into structured sections.
 * @param {string} text - Full AI response
 * @returns {object} - Extracted sections
 */
function parseSections(text) {
  const sections = {
    condition: "Condition details not clearly identified.",
    recommendation: "No specific recommendations found.",
    homeRemedies: "No home remedies mentioned."
  };

  const parts = text.split(/\*\*\s*\d\.\s*/).map(p => p.trim());

  for (const part of parts) {
    if (/condition|diagnosis|explanation/i.test(part)) {
      sections.condition = cleanMarkdown(part);
    } else if (/recommendation|treatment|advice/i.test(part)) {
      sections.recommendation = cleanMarkdown(part);
    } else if (/home remedies|lifestyle|natural/i.test(part)) {
      sections.homeRemedies = cleanMarkdown(part);
    }
  }

  return sections;
}

/**
 * Cleans common markdown formatting for display
 * @param {string} str - Markdown text
 * @returns {string}
 */
function cleanMarkdown(str) {
  return str.replace(/[*_`]+/g, '').trim();
}

module.exports = {
  analyzeSymptoms,
};
