import { Canvas, Textbox } from 'fabric';
import { Text } from '../types/PrimeScene';
import { useRef, useEffect, useState } from 'react';

const CanvasTextBox: React.FC<CanvasTextBoxProps> = ({
  canvas,
  options,
  scalingFactor,
}) => {
  const textboxRef = useRef<Textbox | null>(null);
  const [text, setText] = useState<string>(options.Text);

  useEffect(() => {
    const fontOptions = options.Font;
    const horizontalAlignment = convertHorizontalAlignment(
      options.HorizontalAlignment,
    );
    const textbox = new Textbox(options.Text, {
      left: options.Position.X * scalingFactor,
      top: options.Position.Y * scalingFactor,
      width: options.Size.Width * scalingFactor,
      height: options.Size.Height * scalingFactor,
      textAlign: horizontalAlignment,
      originY: convertVerticalAlignment(options.VerticalAlignment),
      originX: horizontalAlignment,
      angle: options.Rotation.Z,
      selectable: false,
      opacity: options.Opacity / 100,
      fontFamily: fontOptions.Name || 'Arial',
      fontSize: fontOptions.Size * scalingFactor,
      fontWeight: fontOptions.Weight,
      fontStyle: fontOptions.Style,
      fill: '#' + fontOptions.Color,
    });

    canvas.add(textbox);
    textboxRef.current = textbox;

    return () => {
      if (textboxRef.current) {
        canvas.remove(textboxRef.current);
      }
    };
  }, [canvas, options, scalingFactor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    textboxRef.current?.set('text', newText);
    canvas.renderAll();
  };

  return (
    <div className="list-item">
      <span>{options.Name}: </span>
      <input type="text" value={text} onChange={handleInputChange} />
    </div>
  );
};

const convertVerticalAlignment = (alignment: string) => {
  switch (alignment) {
    case 'Top':
    case 'First':
      return 'top';
    case 'Middle':
      return 'center';
    case 'Last':
    case 'Bottom':
      return 'bottom';
    default:
      throw Error('Verical alignment does not exists: ' + alignment);
  }
};

const convertHorizontalAlignment = (alignment: string) => {
  switch (alignment) {
    case 'Left':
    case 'First':
      return 'left';
    case 'Center':
      return 'center';
    case 'Last':
    case 'Right':
      return 'right';
    default:
      throw Error('Verical alignment does not exists: ' + alignment);
  }
};

type CanvasTextBoxProps = {
  canvas: Canvas;
  options: Text;
  scalingFactor: number;
};

export default CanvasTextBox;
