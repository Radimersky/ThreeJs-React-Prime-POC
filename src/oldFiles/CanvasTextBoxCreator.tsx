import { Canvas, Textbox } from 'fabric';
import { useState } from 'react';

const CanvasTextBoxCreator: React.FC<CanvasTextBoxCreatorProps> = ({
  canvas,
  textPositionX,
  textPositionY,
  fontSize,
}) => {
  const [inputValue, setInputValue] = useState<string>('AXIS');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const textBox = createTextBox(inputValue);
    canvas.add(textBox);
  };

  const createTextBox = (text: string, readonly = false): Textbox => {
    const textBox = new Textbox(text, {
      left: textPositionX,
      top: textPositionY,
      originX: 'left',
      originY: 'top',
      width: 50,
      height: 100,
      selectable: !readonly,
      fontSize,
    });

    return textBox;
  };

  return (
    <div className="tool-container tool-column">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Add Text</button>
    </div>
  );
};

type CanvasTextBoxCreatorProps = {
  canvas: Canvas;
  textPositionX: number;
  textPositionY: number;
  fontSize: number;
};

export default CanvasTextBoxCreator;
