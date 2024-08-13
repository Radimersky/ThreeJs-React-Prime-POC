import { useContext } from 'react';
import { ImageUrlContext } from './contextProviders/ImageUrlProvider';

export const useImageUrl = () => {
  const context = useContext(ImageUrlContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
