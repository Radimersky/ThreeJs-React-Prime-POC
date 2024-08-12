import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DictionaryContextType {
  urlDictonary: { [key: string]: string };
  addEntry: (key: string, value: string) => void;
}

interface DictionaryProviderProps {
  children: ReactNode;
}

const ImageUrlContext = createContext<DictionaryContextType | undefined>(
  undefined,
);

export const useImageUrl = () => {
  const context = useContext(ImageUrlContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};

export const ImageUrlProvider: React.FC<DictionaryProviderProps> = ({
  children,
}) => {
  const [urlDictionary, setUrlDictionary] = useState<{ [key: string]: string }>(
    {},
  );

  const addEntry = (key: string, value: string) => {
    setUrlDictionary(prevDictionary => ({
      ...prevDictionary,
      [key]: value,
    }));
  };

  return (
    <ImageUrlContext.Provider value={{ urlDictonary: urlDictionary, addEntry }}>
      {children}
    </ImageUrlContext.Provider>
  );
};

export default useImageUrl;
