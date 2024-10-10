import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        // Initialize the chat session with the provided configuration
        const chatSession = await model.startChat({
            generationConfig,
            history: [], // Empty history for now
        });

        // Send the message directly as a string
        const result = await chatSession.sendMessage(prompt);

        // Log the full result to understand the response structure
       

        // Access the text in the expected way
        if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
            // Extract text from the first candidate's first part
            const responseText = result.response.candidates[0].content.parts[0].text; // Extract the text
            console.log(responseText); // Log the formatted output as a string
            return responseText; ; // Return the formatted output
        } else {
            throw new Error("Unexpected API response format");
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export default run;
