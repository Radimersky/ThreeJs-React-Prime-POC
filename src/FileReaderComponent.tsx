import React, { useState } from 'react';
import { ReadMode } from './types/ReadMode';

const FileReaderComponent: React.FC<FileReaderProps> = ({
  onFileRead,
  readMode,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = e => {
          if (e.target && e.target.result) {
            onFileRead(e.target.result);
          } else {
            handleError(e);
          }
        };

        reader.onerror = e => handleError(e);

        if (readMode === ReadMode.File) {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleError = (e: ProgressEvent<FileReader>) => {
    setError('Error reading file, check console.');
    console.error(e);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      {error && <div>Error: {error}</div>}
    </div>
  );
};

type FileReaderProps = {
  onFileRead: (fileContent: string | ArrayBuffer) => void;
  readMode: ReadMode;
};

export default FileReaderComponent;
