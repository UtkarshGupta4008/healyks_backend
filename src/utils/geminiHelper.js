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
  // Try to match a section starting with "Possible condition(s)" or similar
  const match = text.match(/(?:Possible condition(?:s)?|Likely diagnosis|Medical explanation)[:\s]*([\s\S]+?)(?:\n\s*\n|Recommended|Advice|Home remedies|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Fallback: first paragraph that seems diagnostic
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  for (const p of paragraphs) {
    if (p.toLowerCase().includes('likely') || p.toLowerCase().includes('may be') || p.toLowerCase().includes('condition')) {
      return p;
    }
  }

  return "Condition details not clearly identified.";
}


function extractRecommendation(text) {
  // Try to match a section for medical advice or recommendations
  const match = text.match(/(?:Recommended actions|Doctor's advice|Treatment recommendation|Clinical advice)[:\s]*([\s\S]+?)(?:\n\s*\n|Home remedies|Lifestyle tips|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Fallback: paragraph that includes "should", "recommend", "advised", etc.
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  for (const p of paragraphs) {
    if (p.toLowerCase().includes('should') || p.toLowerCase().includes('recommend') || p.toLowerCase().includes('advised')) {
      return p;
    }
  }

  return "No specific recommendations found.";
}

function extractHomeRemedies(text) {
  const match = text.match(/(?:Home remedies|Lifestyle tips|Natural treatments)[:\s]*([\s\S]+?)(?:\n\s*\n|Advice|Seek|$)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  for (const p of paragraphs) {
    if (p.toLowerCase().includes('remedy') || p.toLowerCase().includes('at home') || p.toLowerCase().includes('natural')) {
      return p;
    }
  }

  return "No home remedies mentioned.";
}


module.exports = {
  analyzeSymptoms,
};