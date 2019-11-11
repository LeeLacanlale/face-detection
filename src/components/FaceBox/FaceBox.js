import React from 'react';
import './FaceBox.css';

const FaceBox = ({ top, right, bottom, left }) => {
  return (
    <div className='bounding-box-set'>
      <div className='bounding-box' style={{top: top, right: right, bottom: bottom, left: left}}></div>
    </div>
  )
}

export default FaceBox;