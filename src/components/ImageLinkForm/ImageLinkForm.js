import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ inputChange, imageSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='middle'>
        <div className='form pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={inputChange} placeholder='Enter Image' />
          <button
            className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple'
            onClick={imageSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;