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

/**
 * Parse Gemini response into structured sections with word limits
 * @param {string} text - Full Gemini response
 * @returns {object}
 */
function parseSections(text) {
  const sections = {
    condition: "Condition details not clearly identified.",
    recommendation: "No specific recommendations found.",
    homeRemedies: "No home remedies mentioned."
  };

  const section1 = text.match(/(?:1\.|1\)|①)[^\n]*?\n([\s\S]+?)(?=(?:\n2\.|2\)|②|\n2\s|$))/i);
  const section2 = text.match(/(?:2\.|2\)|②)[^\n]*?\n([\s\S]+?)(?=(?:\n3\.|3\)|③|\n3\s|$))/i);
  const section3 = text.match(/(?:3\.|3\)|③)[^\n]*?\n([\s\S]+?)(?=(?:\n4\.|When to see a doctor|Seek medical attention|$))/i);

  if (section1) sections.condition = limitWords(cleanMarkdown(section1[1]), 300);
  if (section2) sections.recommendation = limitWords(cleanMarkdown(section2[1]), 300);
  if (section3) sections.homeRemedies = limitWords(cleanMarkdown(section3[1]), 300);

  return sections;
}

/**
 * Removes markdown symbols
 * @param {string} str
 * @returns {string}
 */
function cleanMarkdown(str) {
  return str.replace(/[*_`]+/g, '').trim();
}

/**
 * Limits text to N words
 * @param {string} text
 * @param {number} wordLimit
 * @returns {string}
 */
function limitWords(text, wordLimit) {
  const words = text.split(/\s+/);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
}

module.exports = {
  analyzeSymptoms,
};
