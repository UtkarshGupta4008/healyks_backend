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

/**
 * Extract condition information from the AI response
 * @param {string} text - Full AI response text
 * @returns {string} - Extracted condition information
 */
function extractCondition(text) {
  // First try to match the explicit format
  const pattern = /Possible condition(?:\(s\))?:?\s*([\s\S]*?)(?=\n\s*Recommended actions:|$)/i;
  const match = text.match(pattern);
  
  if (match && match[1] && match[1].trim()) {
    return match[1].trim();
  }
  
  // Second attempt with a more lenient pattern
  const lenientPattern = /(?:Possible|Potential|Likely) condition[^:]*:\s*([\s\S]*?)(?=\n\s*Recommended|Home|$)/i;
  const lenientMatch = text.match(lenientPattern);
  
  if (lenientMatch && lenientMatch[1] && lenientMatch[1].trim()) {
    return lenientMatch[1].trim();
  }
  
  // If still no match, extract the first paragraph that might be about conditions
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (paragraph.toLowerCase().includes('condition') || 
        paragraph.toLowerCase().includes('diagnosis') || 
        paragraph.toLowerCase().includes('suffering from') || 
        paragraph.toLowerCase().includes('symptoms suggest')) {
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
  const pattern = /Recommended actions:?\s*([\s\S]*?)(?=\n\s*Home remedies:|$)/i;
  const match = text.match(pattern);
  
  if (match && match[1] && match[1].trim()) {
    return match[1].trim();
  }
  
  // Second attempt with a more lenient pattern
  const lenientPattern = /(?:Recommend|Advice|What to do)[^:]*:\s*([\s\S]*?)(?=\n\s*Home|$)/i;
  const lenientMatch = text.match(lenientPattern);
  
  if (lenientMatch && lenientMatch[1] && lenientMatch[1].trim()) {
    return lenientMatch[1].trim();
  }
  
  // If still no match, look for paragraphs that seem like recommendations
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (paragraph.toLowerCase().includes('recommend') || 
        paragraph.toLowerCase().includes('should see') || 
        paragraph.toLowerCase().includes('advised to') ||
        paragraph.toLowerCase().includes('seek medical')) {
      return paragraph.trim();
    }
  }
  
  // Fallback
  return "Consult a healthcare professional";
}
function extractHomeRemedies(text) {
  const pattern = /Home remedies:?\s*([\s\S]*?)(?=\n\n\s*|$)/i;
  const match = text.match(pattern);
  
  if (match && match[1] && match[1].trim()) {
    return match[1].trim();
  }
  
  // Second attempt with a more lenient pattern
  const lenientPattern = /(?:Home|Natural|Self)[^:]*(?:remedies|care|treatment)[^:]*:?\s*([\s\S]*?)(?=\n\n|$)/i;
  const lenientMatch = text.match(lenientPattern);
  
  if (lenientMatch && lenientMatch[1] && lenientMatch[1].trim()) {
    return lenientMatch[1].trim();
  }
  
  // If still no match, look for paragraphs that seem like home remedies
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  for (const paragraph of paragraphs) {
    if (paragraph.toLowerCase().includes('home') && 
       (paragraph.toLowerCase().includes('remedy') || paragraph.toLowerCase().includes('treatment'))) {
      return paragraph.trim();
    }
  }
  
  // Fallback
  return "No specific home remedies provided";
}

module.exports = {
  analyzeSymptoms,
};