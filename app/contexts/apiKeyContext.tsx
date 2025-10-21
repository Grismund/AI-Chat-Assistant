import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ApiKeyContextType {
    apiKey: string;
    setApiKey: (key: string) => void;
    anthropicApiKey: string;
    setAnthropicApiKey: (key: string) => void;
}

// Create API key context
const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// API key context provider component
export const ApiKeyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [openAiApiKey, setOpenAiApiKeyState] = useState<string>('');
    const [anthropicApiKey, setAnthropicApiKeyState] = useState<string>('');

    // Load API key from storage on component mount
    useEffect(() => {
        const loadApiKey = async () => {
            const openAiKey = await AsyncStorage.getItem('openAiApiKey');
            const anthropicKey = await AsyncStorage.getItem('anthropicApiKey');
            setOpenAiApiKey(openAiKey || '');
            setAnthropicApiKey(anthropicKey || '');
        };

        loadApiKey();
    }, []);

    // Function to update the API key state and save it to storage
    const setOpenAiApiKey = async (key: string) => {
        setApiKeyState(key);
        await AsyncStorage.setItem('openAiApiKey', key);
    };

    const setAnthropicApiKey = async (key: string) => {
        setAnthropicApiKeyState(key);
        await AsyncStorage.setItem('anthropicApiKey', key);
    };

    return (
        <ApiKeyContext.Provider value={{ openAiApiKey, setOpenAiApiKey, anthropicApiKey, setAnthropicApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

// Custom hook to use the API key context
export const useApiKeyContext = (): ApiKeyContextType => {

    const context = useContext(ApiKeyContext);

    if (!context) {
        throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
    }

    return context;
};