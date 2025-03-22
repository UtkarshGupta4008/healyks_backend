const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);

/**
 * Simple function to analyze symptoms using Gemini
 * @param {string} symptoms - User symptoms
 * @returns {Promise<object>} - Structured analysis of symptoms
 */
const analyzeSymptoms = async (symptoms,userProfile) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });
    
    // Construct a prompt that encourages concise responses
    let prompt = `As a healthcare assistant, analyze the following symptoms: "${symptoms}"`;
    if (userProfile) {
      prompt += `\nUser information: ${userProfile.age} years old, ${userProfile.gender}`;

      if (userProfile.chronicDiseases && userProfile.chronicDiseases.length > 0) {
        prompt += `\nChronic conditions: ${userProfile.chronicDiseases.join(', ')}`;
      }

      if (userProfile.allergies && userProfile.allergies.length > 0) {
        prompt += `\nAllergies: ${userProfile.allergies.join(', ')}`;
      }
    }

    
    prompt+=`Please behave like a medical doctor in your response. Your response should include:

1. A detailed explanation of the most likely medical condition(s) based on the symptoms.
2. Professional recommendations for treatment, both clinical and non-clinical.
3. Safe and effective home remedies or lifestyle tips the patient can try, if applicable.
4. Advice on when the patient should seek in-person medical attention.

Use a clear, informative, and empathetic tone.`;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the response to extract structured information
    return {
      condition: extractCondition(text),
      recommendation: extractRecommendation(text),
      homeRemedies: extractHomeRemedies(text),
    };
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};
function extractCondition(text) {
  const match = text.match(/(?:\*\*1\.\s*Possible Medical Conditions.*?\*\*|Possible condition(?:s)?|Likely diagnosis|Medical explanation)[:\s]*([\s\S]+?)(?:\*\*2\.|Recommended|Doctor|Advice|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  return "Condition details not clearly identified.";
}



function extractRecommendation(text) {
  const match = text.match(/(?:\*\*2\.\s*Professional Recommendations.*?\*\*|Recommended actions|Doctor's advice|Treatment recommendation|Clinical advice)[:\s]*([\s\S]+?)(?:\*\*3\.|Home remedies|Lifestyle|Advice|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  return "No specific recommendations found.";
}


function extractHomeRemedies(text) {
  const match = text.match(/(?:\*\*3\.\s*.*?Home Remedies.*?\*\*|Home remedies|Lifestyle tips|Natural treatments)[:\s]*([\s\S]+?)(?:\*\*4\.|Advice|Seek|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  return "No home remedies mentioned.";
}



module.exports = {
  analyzeSymptoms,
};