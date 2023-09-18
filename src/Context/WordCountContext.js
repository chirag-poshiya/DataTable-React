import React, { createContext, useContext, useState } from 'react';

// Create a context
const WordCountContext = createContext();

// Create a context provider
export function WordCountProvider({ children }) {
    const [wordCount, setWordCount] = useState(0);
    const [recordCount, setRecordCount] = useState(0);
    const [apiData, setApiData] = useState([]);
    const [visible, setVisible] = useState(false);

    const updateWordCount = (count) => {
        setWordCount(count);
    };
    const updateRecordsCount = (count) => {
        console.log('.RCU...', count)
        setRecordCount(count);
    };

    return (
        <WordCountContext.Provider value={{ wordCount, updateWordCount , apiData , setApiData, recordCount,updateRecordsCount , visible, setVisible }}>
            {children}
        </WordCountContext.Provider>
    );
}

// Create a custom hook to use the context
export function useWordCount() {
    return useContext(WordCountContext);
}
