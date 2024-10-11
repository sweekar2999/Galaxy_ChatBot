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
            const response = await run(prompt); 
            setResultData(response);
            setInput(""); 
            setRecentPrompt(prompt); 
            setPrevPrompt((prev) => [...prev, prompt]); 
           
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false); 
        }
    };


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