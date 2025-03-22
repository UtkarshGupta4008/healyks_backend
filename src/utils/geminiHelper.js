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

    
    prompt+=`\nPlease provide very concise responses in the following format:
    
    Possible condition(s): [brief, 1-2 sentence description of the most likely condition]
    Recommended actions: [brief, 1-2 sentence practical advice]
    
    Keep each response section to no more than 500 words.`;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the response to extract structured information
    return {
      condition: extractCondition(text),
      recommendation: extractRecommendation(text),
    };
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};

/**
 * Extract condition information from the AI response
 * @param {string} text - Full AI response text
 * @returns {string} - Extracted condition information
 */
function extractCondition(text) {
  // First try to match the explicit format
  const explicitMatch = text.match(/Possible condition(?:\(s\))?:?\s*(.*?)(?:\n|$)/i);
  if (explicitMatch && explicitMatch[1].trim()) {
    return explicitMatch[1].trim();
  }
  
  // If no explicit match, try to find the first paragraph that might contain condition info
  const paragraphs = text.split('\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (paragraph.toLowerCase().includes('condition') || 
        paragraph.toLowerCase().includes('may be') || 
        paragraph.toLowerCase().includes('could be') ||
        paragraph.toLowerCase().includes('likely')) {
      return paragraph.trim();
    }
  }
  
  // Fallback
  return "Unable to determine condition";
}

/**
 * Extract recommendation information from the AI response
 * @param {string} text - Full AI response text
 * @returns {string} - Extracted recommendation information
 */
function extractRecommendation(text) {
  // First try to match the explicit format
  const explicitMatch = text.match(/Recommend(?:ed|ation)(?:\s+actions)?:?\s*(.*?)(?:\n|$)/i);
  if (explicitMatch && explicitMatch[1].trim()) {
    return explicitMatch[1].trim();
  }
  
  // Try to find any paragraph that talks about recommendations
  const paragraphs = text.split('\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (paragraph.toLowerCase().includes('recommend') || 
        paragraph.toLowerCase().includes('should') || 
        paragraph.toLowerCase().includes('advised') ||
        paragraph.toLowerCase().includes('consider')) {
      return paragraph.trim();
    }
  }
  
  // Fallback
  return "Consult a healthcare professional";
}

module.exports = {
  analyzeSymptoms,
};