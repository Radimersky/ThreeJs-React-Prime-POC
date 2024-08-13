import { useState, ReactNode, createContext } from 'react';

export const ImageUrlContext = createContext<ImageUrlContextType | undefined>(
  undefined,
);

export const ImageUrlProvider: React.FC<ImageUrlProviderProps> = ({
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

export interface ImageUrlContextType {
  urlDictonary: { [key: string]: string };
  addEntry: (key: string, value: string) => void;
}

interface ImageUrlProviderProps {
  children: ReactNode;
}
