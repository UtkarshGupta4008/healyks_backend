const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Simple function to analyze symptoms using Gemini
 * @param {string} symptoms - User symptoms
 * @returns {Promise<string>} - Gemini's analysis
 */
const analyzeSymptoms = async (symptoms) => {
    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });
    
        // Construct the prompt with user context if available
        let prompt = `As a healthcare assistant, analyze the following symptoms: "${symptoms}"`;
    
        // Add user context if available
        if (userProfile) {
          prompt += `\nUser information: ${userProfile.age} years old, ${userProfile.gender}`;
          
          if (userProfile.chronicDiseases && userProfile.chronicDiseases.length > 0) {
            prompt += `\nChronic conditions: ${userProfile.chronicDiseases.join(', ')}`;
          }
          
          if (userProfile.allergies && userProfile.allergies.length > 0) {
            prompt += `\nAllergies: ${userProfile.allergies.join(', ')}`;
          }
        }
    
        prompt += `\nPlease provide: 
        1. Possible condition(s)
        2. Recommended actions
        3. Home care advice if applicable
        4. When to seek professional medical help`;
    
        // Generate content
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
    
        // Parse the response to extract structured information
        return {
          condition: extractCondition(text),
          recommendation: extractRecommendation(text),
          homeCare: extractHomeCare(text),
          seekHelp: extractWhenToSeekHelp(text),
          fullResponse: text
        };
      } catch (error) {
        console.error('Error analyzing symptoms:', error);
        throw new Error('Failed to analyze symptoms');
      }
    };
module.exports = {
    analyzeSymptoms,
}