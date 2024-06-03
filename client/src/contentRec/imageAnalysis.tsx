import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';  // Import the WebGL backend
import '@tensorflow/tfjs-backend-cpu';    // Import the CPU backend
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
//import { EfficientNetB0 } from '@tensorflow-models/efficientnet';

const ImageAnalysis: React.FC = () => {
  const imageSrc = '/image.png'; // Replace with your image path

  useEffect(() => {
    const analyzeImage = async () => {
        await tf.setBackend('webgl');
        await tf.ready();  // Ensure the backend is ready
  
        // Load both the COCO-SSD and MobileNet models
        const [cocoSsdModel, mobilenetModel] = await Promise.all([
          cocoSsd.load(),
          mobilenet.load()
        ]);
  

        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = 'anonymous';
        image.onload = async () => {

          const [cocoPredictions, mobilenetPredictions] = await Promise.all([
            cocoSsdModel.detect(image),
            mobilenetModel.classify(image, 10)
          ]);
  

          const cocoTags = cocoPredictions.map(prediction => prediction.class);
          const mobilenetTags = mobilenetPredictions.map(prediction => prediction.className);
          const combinedTags = [...new Set([...cocoTags, ...mobilenetTags])]; 

          console.log(combinedTags);
      };
    };
    console.log("abcd");
    analyzeImage();
  }, []);

  return (
    <div>
      <p>Check the console for the image tags.</p>
      <img src={imageSrc} alt="Analyzed"  />
    </div>
  );
};

export default ImageAnalysis;