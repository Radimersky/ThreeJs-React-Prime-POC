import { useState } from 'react';
import FileReaderComponent from './FileReaderComponent';
import { XMLParser } from 'fast-xml-parser';
import { PrimeScene, RootSceneContanier } from './types/PrimeScene';
import { ReadMode } from './types/ReadMode';

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
};

const SceneParser: React.FC<SceneParserProps> = ({ onScenesParsed }) => {
  const [xmlParser] = useState<XMLParser>(new XMLParser(parserOptions));
  const [scenes, setScenes] = useState<PrimeScene[]>([]);

  const handleFileContent = (fileContent: string | ArrayBuffer) => {
    if (fileContent instanceof ArrayBuffer) {
      parseXml(Buffer.from(fileContent));
    } else {
      parseXml(fileContent);
    }
  };

  const parseXml = (xmlContent: string | Buffer) => {
    // TODO Implement type guards
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsXmlContent = xmlParser.parse(xmlContent) as RootSceneContanier;
    console.log(jsXmlContent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sortedScenes = [...scenes, jsXmlContent.Scene].sort(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (a, b) => b.Canvas.Layer - a.Canvas.Layer,
    );

    setScenes(sortedScenes);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    onScenesParsed(sortedScenes);
  };

  return (
    <div className="tool-container">
      <span>Select Prime Scene:</span>
      <FileReaderComponent
        onFileRead={handleFileContent}
        readMode={ReadMode.File}
      />
      <button onClick={() => setScenes([])}>Reset</button>
    </div>
  );
};

type SceneParserProps = {
  onScenesParsed: (scenes: PrimeScene[]) => void;
};

export default SceneParser;
