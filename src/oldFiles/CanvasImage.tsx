import { FabricImage, Canvas } from 'fabric';
import { Image as ImageType } from '../types/PrimeScene';
import { useRef, useEffect, useState } from 'react';
import FileReaderComponent from '../FileReaderComponent';
import { ReadMode } from '../types/ReadMode';

const CanvasImage: React.FC<CanvasImageProps> = ({
  canvas,
  options,
  scalingFactor,
}) => {
  const imageRef = useRef<FabricImage | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log(options);

  useEffect(() => {
    if (!imageUrl) return;

    FabricImage.fromURL(imageUrl)
      .then(img => {
        imageRef.current = img;

        img.scaleToWidth(options.Size.Width * scalingFactor);
        img.scaleToHeight(options.Size.Height * scalingFactor);

        img.set({
          left: options.Position.X * scalingFactor,
          top: options.Position.Y * scalingFactor,
          angle: options.Rotation.Z,
          opacity: options.Opacity / 100,
          originX: options.Origin.X,
          originY: options.Origin.Y,
        });

        canvas.add(img);
        canvas.renderAll();
      })
      .catch(error => {
        console.error('Error loading image:', error);
      });

    return () => {
      if (imageRef.current) {
        canvas.remove(imageRef.current);
      }
    };
  }, [canvas, options, scalingFactor, imageUrl]);

  const handleImageRead = (imageUrl: string | ArrayBuffer) => {
    if (imageUrl instanceof ArrayBuffer) {
      const decoder = new TextDecoder('utf-8');
      setImageUrl(decoder.decode(imageUrl));
    } else {
      setImageUrl(imageUrl);
    }
  };

  return (
    <div className="list-item">
      <span>{options.Name}: </span>
      <FileReaderComponent
        onFileRead={handleImageRead}
        readMode={ReadMode.Url}
      />
    </div>
  );
};

type CanvasImageProps = {
  canvas: Canvas;
  options: ImageType;
  scalingFactor: number;
};

export default CanvasImage;
