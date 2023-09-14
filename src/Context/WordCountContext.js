import React, { createContext, useContext, useState } from 'react';

// Create a context
const WordCountContext = createContext();

// Create a context provider
export function WordCountProvider({ children }) {
    const [wordCount, setWordCount] = useState([]);
    const [apiData, setApiData] = useState([]);

    const updateWordCount = (count) => {
        setWordCount(count);
    };

    return (
        <WordCountContext.Provider value={{ wordCount, updateWordCount , apiData , setApiData }}>
            {children}
        </WordCountContext.Provider>
    );
}

// Create a custom hook to use the context
export function useWordCount() {
    return useContext(WordCountContext);
}
