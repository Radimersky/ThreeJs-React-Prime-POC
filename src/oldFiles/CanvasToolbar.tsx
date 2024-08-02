import { useContext } from 'react';
import CanvasOperation from './CanvasTextBoxCreator';
import { CanvasContext } from './CanvasContextProvider.tsx';
import CanvasSceneControll from './CanvasSceneControll.tsx';

const CanvasToolbar: React.FC = () => {
  const [canvas] = useContext(CanvasContext);

  if (!canvas) {
    return null;
  }

  return (
    <div className="flex">
      <CanvasOperation
        canvas={canvas}
        fontSize={30}
        textPositionX={100}
        textPositionY={100}
      />
      <CanvasSceneControll />
    </div>
  );
};

export default CanvasToolbar;
