import run from "../config/gemini";
import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [resultData, setResultData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
 
    // Define the onSent function first
    const onSent = async (prompt) => {
        setLoading(true); // Set loading to true before sending
        try {
            setResultData("");
            setShowResult(true);
            const response = await run(prompt); // Use the prompt passed to the function
            setResultData(response);
            setInput(""); 
            setRecentPrompt(prompt); // Update recent prompt
            setPrevPrompt((prev) => [...prev, prompt]); // Add to previous prompts
             // Show the result
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false); // Set loading to false after the request
        }
    };

    // Now you can safely use onSent in ContextValue
    const ContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        resultData,
        showResult,
        loading,
        input,
        setInput,
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;