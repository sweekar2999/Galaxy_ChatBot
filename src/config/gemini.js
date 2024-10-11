import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyAB_a4-2EFDbExzkjOww27Yxku067tRlN0";
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
      
        const chatSession = await model.startChat({
            generationConfig,
            history: [], 
        });

      
        const result = await chatSession.sendMessage(prompt);

        
       

        // Access the text in the expected way
        if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
           
            const responseText = result.response.candidates[0].content.parts[0].text; // Extract the text
            console.log(responseText); 
            return responseText; ;
        } else {
            throw new Error("Unexpected API response format");
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export default run;
