import { useEffect, useState } from 'react';
import FileReaderComponent from './FileReaderComponent';
import { xml2js } from 'xml-js';
import { ReadMode } from './types/ReadMode';
import { RootSceneElement } from './types/SceneTypes';
import { stringToNumberOrThrow } from './TypeConverters';
import {
  selectTextElementValueOrThrow,
  getSceneFromRootElementOrThrow,
} from './SceneTreeTraversalHelpers';

const SceneParser: React.FC<SceneParserProps> = ({ onScenesParsed }) => {
  const [scenes, setScenes] = useState<RootSceneElement[]>([]);

  useEffect(() => {
    onScenesParsed(scenes);
  }, [scenes, onScenesParsed]);

  const handleFileContent = (fileContent: string | ArrayBuffer) => {
    if (fileContent instanceof ArrayBuffer) {
      parseXml(new TextDecoder('utf-8').decode(fileContent));
    } else {
      parseXml(fileContent);
    }
  };

  const parseXml = (xmlContent: string) => {
    const parsedContent = xml2js(xmlContent, {
      compact: false,
      alwaysChildren: true,
    });

    console.log(parsedContent);
    const rootElement = parsedContent as RootSceneElement;

    setScenes(scenes => {
      const sortedScenes = [...scenes, rootElement].sort((rootA, rootB) => {
        const sceneA = getSceneFromRootElementOrThrow(rootA);
        const sceneB = getSceneFromRootElementOrThrow(rootB);

        const path = ['Canvas', 'Layer'];
        const layerA = selectTextElementValueOrThrow(sceneA, path);
        const layerB = selectTextElementValueOrThrow(sceneB, path);
        return stringToNumberOrThrow(layerB) - stringToNumberOrThrow(layerA);
      });
      return sortedScenes;
    });
  };

  return (
    <div className="tool-container">
      <span>Select Prime Scene:</span>
      <FileReaderComponent
        onFileRead={handleFileContent}
        readMode={ReadMode.File}
      />
    </div>
  );
};

type SceneParserProps = {
  onScenesParsed: (scenes: RootSceneElement[]) => void;
};

export default SceneParser;
