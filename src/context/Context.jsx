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
 
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        setLoading(true); 
        try {
            setResultData("");
            setShowResult(true);
            const response = await run(prompt);
            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("</br>"); 
            let newResponseArray = newResponse2.split(" ");
            
            // Update state with a loop using delay
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i] + " ";
                delayPara(i, nextWord);
            }

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
