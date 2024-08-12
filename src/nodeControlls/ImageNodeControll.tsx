import { createImageUrlKey } from '../HelperFunctions.ts';
import { BaseElement } from '../types/SceneTypes';
import FileReaderComponent from '../FileReaderComponent';
import { ReadMode } from '../types/ReadMode';
import { selectTextElementValue } from '../SceneTreeTraversalHelpers';
import { useImageUrl } from '../UseImageUrl';

export const ImageNodeControll: React.FC<ImageNodeControllProps> = ({
  path,
  node,
  rootSceneIndex,
}) => {
  const { addEntry } = useImageUrl();

  const imageName = selectTextElementValue(node, ['Name']);

  const handleImageRead = (imageUrl: string | ArrayBuffer) => {
    const nodeKey = createImageUrlKey(rootSceneIndex, path);
    if (imageUrl instanceof ArrayBuffer) {
      const decoder = new TextDecoder('utf-8');
      addEntry(nodeKey, decoder.decode(imageUrl));
    } else {
      addEntry(nodeKey, imageUrl);
    }
  };

  return (
    <div className="list-item">
      <span>{imageName}: </span>
      <FileReaderComponent
        onFileRead={handleImageRead}
        readMode={ReadMode.Url}
      />
    </div>
  );
};

type ImageNodeControllProps = {
  path: number[];
  node: BaseElement;
  rootSceneIndex: number;
};
