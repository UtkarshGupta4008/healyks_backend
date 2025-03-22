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

    
    prompt += `\nPlease provide a thorough analysis in the following format:
    
Possible condition(s): [Detailed explanation of the most likely medical conditions based on the symptoms]
Recommended actions: [Professional medical advice on next steps]
Home remedies: [Safe home treatments that might provide relief]

Please respond as a medical professional would, with appropriate medical terminology while still being understandable to patients.`;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the response to extract structured information
    return {
      condition: extractCondition(text),
      recommendation: extractRecommendation(text),
      homeRemedies: extractHomeRemedies(text)
    };
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms');
  }
};

function extractCondition(text) {
  const explicitMatch = text.match(/Possible condition(?:\(s\))?:?\s*(\*\*)?(?:\s*\n+)?([\s\S]*?)(?=\n\s*Recommended actions:|$)/i);
  
  if (explicitMatch && explicitMatch[2] && explicitMatch[2].trim()) {
    return explicitMatch[2].trim();
  }
  if (text.startsWith('**') && text.length > 2) {
    const cleanText = text.replace(/^\*\*\s*\n+/, '');
    const sections = cleanText.split(/\n\s*(?:Recommended actions:|Home remedies:)/i);
    if (sections.length > 0) {
      return sections[0].trim();
    }
    
    return cleanText;
  }
  
  // Fallback
  return "Unable to determine condition";
}
function extractRecommendation(text) {
  const explicitMatch = text.match(/Recommended actions:?\s*(\*\*)?(?:\s*\n+)?([\s\S]*?)(?=\n\s*Home remedies:|$)/i);
  
  if (explicitMatch && explicitMatch[2] && explicitMatch[2].trim()) {
    return explicitMatch[2].trim();
  }
  if (text.includes('Recommended actions:')) {
    const recommendationSection = text.split(/Recommended actions:/i)[1];
    if (recommendationSection) {
      const endOfRecommendation = recommendationSection.split(/Home remedies:/i)[0];
      if (endOfRecommendation) {
        // Remove any starting ** and clean up
        return endOfRecommendation.replace(/^\*\*\s*\n+/, '').trim();
      }
    }
  }
  
  // Fallback
  return "Consult a healthcare professional";
}
function extractHomeRemedies(text) {
  const explicitMatch = text.match(/Home remedies:?\s*(\*\*)?(?:\s*\n+)?([\s\S]*?)(?=\n\n\s*|$)/i);
  
  if (explicitMatch && explicitMatch[2] && explicitMatch[2].trim()) {
    return explicitMatch[2].trim();
  }
  
  // For the case where the whole text starts with **
  if (text.includes('Home remedies:')) {
    const remediesSection = text.split(/Home remedies:/i)[1];
    if (remediesSection) {
      // Remove any starting ** and clean up
      return remediesSection.replace(/^\*\*\s*\n+/, '').trim();
    }
  }
  
  // Fallback
  return "No specific home remedies provided";
}

module.exports = {
  analyzeSymptoms,
};