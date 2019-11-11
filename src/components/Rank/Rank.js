import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your image count is currently on...`}
      </div>
      <div className='white f1'>
        {`#${entries}`}
      </div>
    </div>
  )
}

export default Rank;