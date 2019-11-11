import React from 'react';
import FaceBox from '../FaceBox/FaceBox';


const FaceRecognition = ({ imageURL, faceBoxes }) => {
  return (
    <div className='middle ma2'>
      <div className='absolute mt2' width='70%' height='auto'>
        <img id='inputimage' alt='' src={imageURL} width='auto' height='auto'/>
        {
          faceBoxes.map((faceBox, i) => {
            return (
              <FaceBox 
                key={i}
                top={faceBox.top}
                right={faceBox.right}
                bottom={faceBox.bottom}
                left={faceBox.left}
              />
            );
          })
        }
        {/* <canvas id="canvas"></canvas> */}
      </div>
    </div>
  );
}

export default FaceRecognition;