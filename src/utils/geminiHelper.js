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
    
    prompt += `\n\nPlease provide your response in the following format:
    
1. **Medical Condition(s)**: [Your analysis of likely conditions]
2. **Treatment Recommendations**: [Your treatment advice]
3. **Home Remedies & Lifestyle Tips**: [Your home remedy suggestions]

Be concise, medically accurate, and empathetic in tone.
keep each section in not more than 100 words`;
    
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
  
  // Improved regex patterns that better match the actual response format
  const conditionRegex = /(?:1\.?\s*(?:\*\*)?Medical Condition(?:\(s\))?(?:\*\*)?:?)|(?:Medical Condition(?:\(s\))?:?)/i;
  const recommendationRegex = /(?:2\.?\s*(?:\*\*)?Treatment Recommendation(?:s)?(?:\*\*)?:?)|(?:Treatment Recommendation(?:s)?:?)/i;
  const homeRemediesRegex = /(?:3\.?\s*(?:\*\*)?Home Remedies(?:\s*&\s*Lifestyle Tips)?(?:\*\*)?:?)|(?:Home Remedies(?:\s*&\s*Lifestyle Tips)?:?)/i;
  
  // Split the text into sections
  const parts = text.split(/\n(?=\d\.|\*\*\d\.)/);
  
  // Process each part to find our sections
  for (const part of parts) {
    if (conditionRegex.test(part)) {
      sections.condition = extractContent(part, conditionRegex);
    } else if (recommendationRegex.test(part)) {
      sections.recommendation = extractContent(part, recommendationRegex);
    } else if (homeRemediesRegex.test(part)) {
      sections.homeRemedies = extractContent(part, homeRemediesRegex);
    }
  }
  
  return sections;
}

function extractContent(text, headerRegex) {
  // Remove the header and clean up the content
  const content = text.replace(headerRegex, '').trim();
  return limitWords(cleanMarkdown(content), 300);
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