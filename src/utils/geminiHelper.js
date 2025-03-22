const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);

/**
 * Analyze user symptoms using Gemini API
 * @param {string} symptoms - User symptoms
 * @param {object} userProfile - User profile with age, gender, chronic diseases, etc.
 * @returns {Promise<object>} - Structured response with 3 sections
 */
const analyzeSymptoms = async (symptoms, userProfile) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

    let prompt = `As a healthcare assistant, analyze the following symptoms: "${symptoms}".`;

    if (userProfile) {
      prompt += `\nUser information: ${userProfile.age} years old, ${userProfile.gender}.`;

      if (userProfile.chronicDiseases?.length) {
        prompt += `\nChronic conditions: ${userProfile.chronicDiseases.join(', ')}.`;
      }

      if (userProfile.allergies?.length) {
        prompt += `\nAllergies: ${userProfile.allergies.join(', ')}.`;
      }
    }

    prompt += `

Please behave like a medical doctor in your response.

Your response must include the following 3 sections and follow this format:

1. **Medical Condition(s)** – A brief explanation (max 300 words) of the most likely cause(s) based on the symptoms.
2. **Treatment Recommendations** – Professional advice (max 300 words) including both clinical and non-clinical options.
3. **Home Remedies & Lifestyle Tips** – Safe remedies and tips (max 300 words) the user can try at home.

Be concise, medically accurate, and empathetic in tone. Avoid repetition.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return parseSections(text);
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};

function parseSections(text) {
  const sections = {
    condition: "Condition details not clearly identified.",
    recommendation: "No specific recommendations found.",
    homeRemedies: "No home remedies mentioned."
  };

  const raw = cleanMarkdown(text);

  const regexMap = {
    condition: /(1\.\s*|^)[^\n]*condition[^\n]*[\n\-–]*([\s\S]*?)(?=\n\d\.|\n2\.|2\.|^2|$)/i,
    recommendation: /(2\.\s*|^)[^\n]*recommendation[^\n]*[\n\-–]*([\s\S]*?)(?=\n\d\.|\n3\.|3\.|^3|$)/i,
    homeRemedies: /(3\.\s*|^)[^\n]*home remedies[^\n]*[\n\-–]*([\s\S]*?)(?=\n\d\.|\n4\.|$)/i
  };

  for (const key in regexMap) {
    const match = raw.match(regexMap[key]);
    if (match?.[2]) {
      sections[key] = limitWords(match[2].trim(), 300);
    }
  }

  return sections;
}



function cleanMarkdown(str) {
  return str.replace(/[*_`]+/g, '').trim();
}

function limitWords(text, wordLimit) {
  const words = text.split(/\s+/);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
}

module.exports = {
  analyzeSymptoms,
};
